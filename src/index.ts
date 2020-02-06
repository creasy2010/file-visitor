/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/9
 **/

import * as klaw from 'klaw';
import * as fse from 'fs-extra';
import {parse, ParsedPath} from 'path';

export interface IVisitorFunc {
  (context: IContext): void;
}

export interface IVisitor {
  [visitorRegStr: string]: IVisitorFunc;
}

export default async function(dir: string, visitor: IVisitor) {
  let rules = [];

  for (let visitorKey in visitor) {
    rules.push({
      rule: new RegExp(visitorKey),
      cal: visitor[visitorKey],
    });
  }

  klaw(dir)
    .on('data', async item => {
      if (item.stats.isFile() || item.stats.isDirectory()) {
        let content;
        if (item.stats.isFile()) {
          content = (await fse.readFile(item.path)).toString();
        }

        rules.forEach(ruleItem => {
          if (ruleItem.rule.test(item.path)) {
            let context = {
              ...parse(item.path),
              absPath: item.path,
              content,
            } as IContext;
            ruleItem.cal(context);
          }
        });
      }
    })
    .on('end', () => {});
  return ;
}

interface IContext extends ParsedPath {
  content: string;
  absPath: string;
}
