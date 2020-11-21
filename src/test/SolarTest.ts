import {Solar} from '../lib';

const assert = require('assert');

describe('Solar', () => {
    it('toYmd()', () => {
        const solar = Solar.fromYmd(2019, 5, 1);
        assert.strictEqual(solar.toYmd(), '2019-05-01');
    });

    it('toString()', () => {
        const solar = Solar.fromYmd(2019, 5, 1);
        assert.strictEqual(solar.toString(), '2019-05-01');
    });

    it('toFullString()', () => {
        const solar = Solar.fromYmd(2019, 5, 1);
        assert.strictEqual(solar.toFullString(), '2019-05-01 00:00:00 星期三 (劳动节) 金牛座');
    });

    it('getLunar()', () => {
        const solar = Solar.fromYmd(2019, 5, 1);
        const lunar = solar.getLunar();
        assert.strictEqual(lunar.toString(), '二〇一九年三月廿七');
        assert.strictEqual(lunar.toFullString(), '二〇一九年三月廿七 己亥(猪)年 戊辰(龙)月 戊戌(狗)日 子(鼠)时 纳音[平地木 大林木 平地木 桑柘木] 星期三 (七殿泰山王诞) 西方白虎 星宿[参水猿](吉) 彭祖百忌[戊不受田田主不祥 戌不吃犬作怪上床] 喜神方位[巽](东南) 阳贵神方位[艮](东北) 阴贵神方位[坤](西南) 福神方位[坎](正北) 财神方位[坎](正北) 冲[(壬辰)龙] 煞[北]');
    });

    it('next()', () => {
        let solar = Solar.fromYmd(2020, 1, 23);
        assert.strictEqual(solar.next(1).toString(), '2020-01-24');
        assert.strictEqual(solar.next(1, true).toString(), '2020-02-03');

        solar = Solar.fromYmd(2020, 2, 3);
        assert.strictEqual(solar.next(-3).toString(), '2020-01-31');
        assert.strictEqual(solar.next(-3, true).toString(), '2020-01-21');

        solar = Solar.fromYmd(2020, 2, 9);
        assert.strictEqual(solar.next(6).toString(), '2020-02-15');
        assert.strictEqual(solar.next(6, true).toString(), '2020-02-17');

        solar = Solar.fromYmd(2020, 1, 17);
        assert.strictEqual(solar.next(1).toString(), '2020-01-18');
        assert.strictEqual(solar.next(1, true).toString(), '2020-01-19');
    });

    it('getFestivals()', () => {
        let solar = Solar.fromYmd(2020, 11, 26);
        assert.strictEqual(solar.getFestivals() + '', '感恩节');

        solar = Solar.fromYmd(2020, 6, 21);
        assert.strictEqual(solar.getFestivals() + '', '父亲节');

        solar = Solar.fromYmd(2021, 5, 9);
        assert.strictEqual(solar.getFestivals() + '', '母亲节');

        solar = Solar.fromYmd(1986, 11, 27);
        assert.strictEqual(solar.getFestivals() + '', '感恩节');

        solar = Solar.fromYmd(1985, 6, 16);
        assert.strictEqual(solar.getFestivals() + '', '父亲节');

        solar = Solar.fromYmd(1984, 5, 13);
        assert.strictEqual(solar.getFestivals() + '', '母亲节');
    });

    it('getJulianDay()', () => {
        const solar = Solar.fromYmd(2020, 7, 15);
        assert.strictEqual(solar.getJulianDay(), 2459045.5);
    });

    it('fromJulianDay()', () => {
        const solar = Solar.fromJulianDay(2459045.5);
        assert.strictEqual(solar.toYmdHms(), '2020-07-15 00:00:00');
    });
});
