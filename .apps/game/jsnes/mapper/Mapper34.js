import { Mapper0 } from './Mapper0';

/**
 * Mapper 034 (BNROM, NINA-01)
 *
 * @description http://wiki.nesdev.com/w/index.php/INES_Mapper_034
 * @example Darkseed, Mashou, Mission Impossible 2
 * @constructor
 */
export class Mapper34 extends Mapper0
{
    write(address, value)
    {
        if (address < 0x8000) {
            super.write(address, value);
        } else {
            this.load32kRomBank(value, 0x8000);
        }
    }
}
