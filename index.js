const parser = new DOMParser();

const xmlString = `<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>
`;

const xmlDOM =parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");
const fitstNode = listNode.querySelector("first");
const secondNode = listNode.querySelector("second");
const ageNode = listNode.querySelector("age");
const profNode = listNode.querySelector("prof");
const nameNode = listNode.querySelector("name");

const langAttr = nameNode.getAttribute('lang');

const result = {
    lang: langAttr,
    fitst: fitstNode.textContent,
    second: secondNode.textContent,
    age: ageNode.textContent,
    prof: profNode.textContent,
    name: nameNode.textContent
};
console.log('list', result);