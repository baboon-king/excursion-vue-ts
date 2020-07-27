/**
 *  by  biaochen <834301747@qq.com>  https://biaochenxuying.cn/
 */
type selectItem<T> = { label: string, value: T }
export class utils {

  // 对象转成url查询参数
  objToStrParams(obj: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }): string {
    let pars: string = '?';
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        const el = obj[key];
        pars += `${key}=${el}&`
      }
    }
    return pars
  }
  //判断是移动端还是 pc 端 ，true 表示是移动端，false 表示是 pc 端
  isMobileOrPc(): boolean {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }
  // 时间 格式化成 2018-12-12 12:12:00 默认包含时分秒
  timestampToTime(timestamp: Date | number | string, dayMinSecFlag: boolean = true) {
    const date = new Date(timestamp);
    const Y = date.getFullYear() + "-";
    const M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    const D =
      date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
    const h =
      date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
    const m =
      date.getMinutes() < 10
        ? "0" + date.getMinutes() + ":"
        : date.getMinutes() + ":";
    const s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    if (!dayMinSecFlag) {
      return Y + M + D;
    }
    return Y + M + D + h + m + s;
  }
  citys: selectItem<String>[] = [
    { label: '兰州', value: '兰州' }, { label: '西宁', value: '西宁' },
    { label: '沈阳', value: '沈阳' }, { label: '西安', value: '西安' },
    { label: '银川', value: '银川' }, { label: '成都', value: '成都' },
    { label: '郑州', value: '郑州' }, { label: '济南', value: '济南' },
    { label: '南昌', value: '南昌' }, { label: '太原', value: '太原' },
    { label: '香港', value: '香港' }, { label: '合肥', value: '合肥' },
    { label: '武汉', value: '武汉' }, { label: '长沙', value: '长沙' },
    { label: '北京', value: '北京' }, { label: '杭州', value: '杭州' },
    { label: '贵阳', value: '贵阳' }, { label: '南宁', value: '南宁' },
    { label: '昆明', value: '昆明' }, { label: '拉萨', value: '拉萨' },
    { label: '广州', value: '广州' }, { label: '澳门', value: '澳门' },
    { label: '福州', value: '福州' }, { label: '台北', value: '台北' },
    { label: '海口', value: '海口' }, { label: '上海', value: '上海' },
    { label: '长春', value: '长春' }, { label: '天津', value: '天津' },
    { label: '木齐', value: '木齐' }, { label: '重庆', value: '重庆' },
    { label: '南京', value: '南京' }, { label: '石家庄', value: '石家庄' },
    { label: '呼和浩特', value: '呼和浩特' },
  ]

}

export default new utils()

