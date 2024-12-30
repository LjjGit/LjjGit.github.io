import { Mapper0 } from './Mapper0';

/**
 * Mapper 180
 *
 * @description http://wiki.nesdev.com/w/index.php/INES_Mapper_180
 * @example Crazy Climber
 * @constructor
 */
export class Mapper180 extends Mapper0
{
    write(address, value)
    {
        // Writes to addresses other than MMC registers are handled by NoMapper.
        if (address < 0x8000) {
            super.write(address, value);
        } else {
            // This is a ROM bank select command.
            // Swap in the given ROM bank at 0xc000:
            this.loadRomBank(value, 0xc000);
        }
    }

    loadROM()
    {
        if (!this.nes.rom.valid) {
            throw new Error('Mapper 180: Invalid ROM! Unable to load.');
        }

        // Load PRG-ROM:
        this.loadRomBank(0, 0x8000);
        this.loadRomBank(this.nes.rom.romCount - 1, 0xc000);

        // Load CHR-ROM:
        this.loadCHRROM();

        // Do Reset-Interrupt:
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
    }
}
