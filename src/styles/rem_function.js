const $rootFontSize = 37.5; // 基于iphone 6、6s、7、8 
// 定义像素转化为 rem 函数
export function px2rem ($px) {
    return ($px / $rootFontSize);
}
