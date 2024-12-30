import { Mapper0 } from './Mapper0';

/**
 * Mapper 140
 *
 * @description http://wiki.nesdev.com/w/index.php/INES_Mapper_140
 * @example Bio Senshi Dan - Increaser Tono Tatakai
 * @constructor
 */
export class Mapper140 extends Mapper0
{
    write(address, value)
    {
        if (address < 0x6000 || address > 0x7fff) {
            super.write(address, value);
        } else {
            // Swap in the given PRG-ROM bank at 0x8000:
            this.load32kRomBank((value >> 4) & 3, 0x8000);

            // Swap in the given VROM bank at 0x0000:
            this.load8kVromBank((value & 0xf) * 2, 0x0000);
        }
    }
}
