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