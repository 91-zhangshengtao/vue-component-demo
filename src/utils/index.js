/**
 * @desc 函数节流：每隔一段时间，只执行一次函数(最开始的函数)
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 时间戳，2 定时器
 */
export const throttle = (func, wait ,type) => {
    if(type===1){
        let previous = 0;
    }else if(type===2){
        let handler;
    }

    return function() {
        let context = this
        let args = arguments

        if(type===1){
            let now = Date.now()

            if (now - previous > wait) { 
                func.apply(context, args);
                previous = now // 更新时间
            }
            
        }else if(type===2){
            // 只有在定时器执行完毕后（执行时间函数+初始化状态）才能重新设置
            if(handler){
                return
            }
            handler = setTimeout(() => {
                func.apply(context, args)
                handler = null // wait 后，初始化handler
            }, wait)
            
        }
    }
}

export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result
  
    const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp
  
      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
  
    return function(...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
  
      return result
    }
  }