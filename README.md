# file-visitor

以visitor模式访问数据;  

##使用实例 

```shell script
#添加依赖
npm install file-visitor -save 
```


```typescript
import fileVisitor from  'file-visitor';

async function  test(){
  let test=  await fileVisitor(dirOrFile,{
    ".*\.[tj]s":async ({content,absPath,name,})=>{
            return 'hello';
    }
  });
 
 let result =await Promise.all(test);
 // ['hello','hello']
}
```


 以正则做为来访问到相应的数据


