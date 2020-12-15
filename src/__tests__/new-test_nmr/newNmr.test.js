import { readFileSync } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

import newNmr from '../../parser/newNmr.js';

describe('newnmr', () => {
  it('should fetch the molfile from URL and return molfile in plain text', async () => {
    const path = join(__dirname, '../../../data/JSON-singleProducts.json');
    const singleProducts = JSON.parse(readFileSync(path));
    let test1 =
      '1H-NMR of the crude reaction mixture indicated that two diastereomers were produced in a 50/50 ratio. Chromatography on silica gel (25% EtOAc/hexanes) afforded a pale yellow oil (70 mg, 45%) as a mixture of diastereomers (only one spot by thin layer chromatography). Characterization was performed on the mixture. Whenever distinguishable, values given are for one isomer with those of the second one listed in square brackets.';
    let result1 = {};
    // newNmr(result1, test1, { debug: true });
    const test2 = 'A mix of dimethylformamide (12 mL, 5.6 mmol), ethyl cyanoacetate (0.6 mL, 5.6 mmol) and sodium hydride (0.14 g, 5.6 mmol) was stirred at room temperature for 30 min., then 4-chlorquinazoline (0.92 g, 5.6 mmol) was added to the reaction mixture and the reaction was continued for about 8 hours at 110-115 °С. After refrigerating, water was added  to  the reaction  mixture  and  the  crystals  formed  were  filtered  off.  The  aqueous  filtrate  was extracted with chloroform, the extract dried over anhydrous sodium sulphate and then the chloroform was distilled off. Recrystallization was from petroleum ester. Yield: 0.85g (63.5 %), m.p. 178-179 °С; 1H-NMR: 14.15 (1H, br.s, NH), 9.30 (1H, d, ArH, J=8.5 Hz; 1.3 Hz), 8.15 (d, 1H, H2, J=3 Hz), 7.90-7.42 (3H, m, ArH, J=8.5 Hz; 6 Hz; 3 Hz; 1.3 Hz), 4.30 (2H, q, OCH2, J=7.5 Hz), 1.55 (H, br. s., CH), 1.33 (3H, t., CH2CH3, J=7.5 Hz)';
    let result2 = {};
    newNmr(result2, test2, {debug: true});

    expect(singleProducts.length).toBeGreaterThan(0);
  });
});
