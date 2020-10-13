import { readFileSync } from 'fs';

import { JSDOM } from 'jsdom';

export async function getProducts(filename) {
  console.log(filename);
  let dom = await JSDOM.fromFile(filename, { contentType: 'text/xml' });

  let children = dom.window.document.children;

  for (let child of children) {
    console.log(child.tagName);
    if (child.children) {
      for (let child2 of child.children) {
        console.log(child2.tagName);
        if (child2.innerHTML.includes('NMR')) {
          console.log('xpath');
        }
      }
    }
  }

  function searchDOM(node, xpath, results) {
    if (node.children) {
      xpath.push(node.tagName);
      searchDOM(node.children, xpath, results);
      xpath.pop();
    } else if (node.innerHTML.includes('NMR')) {
      results.push({
        xpath: xpath.slice(),
      });
    }
  }

  console.log(children);

  console.log(
    dom.window.document.getElementById('af1-molecules-10-00098').innerHTML,
  );

  return dom;
}
