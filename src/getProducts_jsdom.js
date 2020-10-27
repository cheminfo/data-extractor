import { JSDOM } from 'jsdom';

export async function getProducts(filename) {
  let dom = await JSDOM.fromFile(filename, { contentType: 'text/xml' });

  //trying to use 'jsdom' module to recover DOM-elements containing 'NMR'---------------------------------------------

  let children = dom.window.document.children;

  // Example of traversing function children by children

  // for (let child of children) {
  //   console.log(`parent has ${children.length} children`);
  //   console.log(`dom.window.document.${child.tagName}`);
  //   if (child.children) {
  //     for (let child2 of child.children) {
  //       console.log(child2.tagName);
  //       if (child2.innerHTML.includes('NMR')) {
  //         console.log('xpath');
  //       }
  //     }
  //   }
  // }

  function searchDOM(node, xpath, results) {
    if (node.children) {
      // console.log(`${node.children.tagName} is child of ${node.tagName}`);
      xpath.push(node.tagName);
      for (let child of node.children) {
        searchDOM(child, xpath, results);
        results.push({
          xpath: xpath,
        });
        xpath.pop();
      }
    } else if (node.innerHTML) {
      console.log('HTML encountered');
      if (node.innerHTML.includes('NMR')) {
        console.log('NO INNER HTML');
        results.push({
          xpath: xpath,
          result: 'MATCH',
        });
      } else {
        results.push({
          xpath: xpath,
          result: 'NO MATCH',
        });
      }
    } else {
      console.log('NO HTML');
      results.push({
        xpath: xpath,
        result: 'NO INNER HTML',
      });
    }
    return xpath;
  }

  const firstParent = dom.window.document;
  let xPaths = [];
  let matches = [];

  let matchesNMR = searchDOM(firstParent, xPaths, matches);
  console.log(matchesNMR.length);
  // console.log(inspect(matchesNMR[0],false, null, true));

  let para = dom.window.document.getElementsByTagName('p');
  console.log(para.item);

  // developPath(dom.window.document, pathCollection);

  console.log(children);

  console.log(
    dom.window.document.getElementById('af1-molecules-10-00098').innerHTML,
  );

  return dom;
}
