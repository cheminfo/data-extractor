import { readFileSync } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

import appendNMR from '../../parser/appendNMR.js';

describe('appendMolfile', () => {
  it('should fetch the molfile from URL and return molfile in plain text', async () => {
    const path = join(__dirname, '../../../examples/productsJSON.json');
    const singleProducts = JSON.parse(readFileSync(path));
    let results = [];
    // let test1 =
    //   '1H-NMR of the crude reaction mixture indicated that two diastereomers were produced in a 50/50 ratio. Chromatography on silica gel (25% EtOAc/hexanes) afforded a pale yellow oil (70 mg, 45%) as a mixture of diastereomers (only one spot by thin layer chromatography). Characterization was performed on the mixture. Whenever distinguishable, values given are for one isomer with those of the second one listed in square brackets.';
    // let result1 = {};
    // // newNmr(result1, test1, { debug: true });
    // const test2 = 'A mix of dimethylformamide (12 mL, 5.6 mmol), ethyl cyanoacetate (0.6 mL, 5.6 mmol) and sodium hydride (0.14 g, 5.6 mmol) was stirred at room temperature for 30 min., then 4-chlorquinazoline (0.92 g, 5.6 mmol) was added to the reaction mixture and the reaction was continued for about 8 hours at 110-115 °С. After refrigerating, water was added  to  the reaction  mixture  and  the  crystals  formed  were  filtered  off.  The  aqueous  filtrate  was extracted with chloroform, the extract dried over anhydrous sodium sulphate and then the chloroform was distilled off. Recrystallization was from petroleum ester. Yield: 0.85g (63.5 %), m.p. 178-179 °С; 1H-NMR: 14.15 (1H, br.s, NH), 9.30 (1H, d, ArH, J=8.5 Hz; 1.3 Hz), 8.15 (d, 1H, H2, J=3 Hz), 7.90-7.42 (3H, m, ArH, J=8.5 Hz; 6 Hz; 3 Hz; 1.3 Hz), 4.30 (2H, q, OCH2, J=7.5 Hz), 1.55 (H, br. s., CH), 1.33 (3H, t., CH2CH3, J=7.5 Hz)';
    // let result2 = {};
    // newNmr(result2, test2, {debug: true});
    // const test3 = 'A mixture of methyl (benzyl 2,3-di-O-benzyl-4-O-methyl-β-D-glucopyranosid)uronate (1) (4.0 g, 8.1 mmol) and 10 % Pd on activated charcoal (0.5 g) in acetone–methanol (1:4, v/v, 200 mL) was stirred under a hydrogen atmosphere (normal pressure) at room temperature. After 2 h, when the debenzylation was complete, the product (Rf = 0.49, chloroform–methanol 5:1; ref. [6] gives Rf = 0.38 in the same solvent) was isolated in the usual manner (filtering off the catalyst, evaporation of the solvent on a vacuum evaporator) affording a mixture of α- and β-anomers (in the ratio of about 2:1) of methyl 4-O-methyl-D-glucopyranuronate (1.75 g, 97 %). From this mixture, the pure α-anomer 2 (1.1 g, 61 %) crystallized slowly from acetone at room temperature. Recrystallization from acetone (with seeding) provided the analytical sample of the title compound 2 as colourless crystals, m.p. 130–131 °C; [α]D + 100° (c 1, MeOH), [α]D + 79° (c 1, H2O) {ref. [6] gives [α]D + 47.5° (c 0.6, 1:1 H2O–EtOH) for a mixture of α- and β-anomers}; 1H-NMR: δ 5.25 (d, 1 H, J1,2 = 3.6 Hz, H-1), 4.39 (d, 1 H, J4,5 = 9.6 Hz, H-5), 3.84 (s, 3 H, COOCH3), 3.81 (t, 1 H, J2,3 = J3,4 = 9.6 Hz, H-3), 3.59 (dd, 1 H, J1,2 = 3.6 Hz, J2,3 = 9.6 Hz, H-2), 3.48 (s, 3 H, OCH3), 3.35 (t, 1 H, J3,4 = J4,5 = 9.6 Hz, H-4); 13C-NMR: δ 172.9 (COOCH3), 93.2 (C-1), 82.2 (C-4), 72.8 (C-3), 71.9 (C-2), 70.0 (C-5), 60.8 (OCH3), 54.2 (COOCH3). Anal. Calcd for C8H14O7 (222.19): C, 43.24; H, 6.35. Found: C, 43.09; H, 6.40.';
    // let result3 = {};
    // newNmr(result3, test3, {debug: true});

    for (let product of singleProducts) {
      appendNMR(product, product.text, { debug: true });
      results.push(product);
    }
    console.log(results.length);
    let samples = results.slice(38, 43);
    console.log(inspect(samples, false, null, true));
    expect(singleProducts.length).toBeGreaterThan(0);
  });
});
