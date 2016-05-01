# Cleareact
**Cleareact** is my assignment based on Flux, React.

###Specification
1. Todo list 는 다음과 같은 기본 기능을 가진다. (Demo 참고)	- 입력한 Task 등록	- 등록된 Task 완료 / 수정 / 삭제	- 필터 (전체보기 / 완료한 Task 보기 / 완료되지 않은 Task 보기)2. Todo list 는 다음과 같은 추가 기능을 가진다.	- 등록한 Task의 하위 Task 추가 / 수정 / 삭제	- 하위 Task는 여러개 등록할 수 있으며 하위 Task의 하위 Task는 갖지 않는다.

##1일차 : Overview
![Flux Structure](https://raw.githubusercontent.com/facebook/flux/master/docs/img/flux-diagram-white-background.png)

[Flux Overview](https://facebook.github.io/flux/docs/overview.html#content) 확인, Video 참고

스토어는 기존의(react에서의) 스마트컴포넌트에서 모든 data를 관리하고, 값이 변경되었을때 해당 데이터를 보여주는 모든 뷰들 (더미 컴포넌트 포함)의 화면을 바꿔주던 일을 기능함.

* 디스패처가 생긴 이유는? : 데이터와 액션의 중심허브, 콜백이 정리되는 곳.
* 컨트롤러뷰 : 뷰의 종류인데, 데이터가 변경된걸 알아차리고, 스토어에서 가져와 모든 자식 뷰에게 새로운 값 전달 (복잡한 view 위계의 상위를 살펴보면 store에 의해 이벤트를 중계할 수 있는 특별한 종류의 view)

[npm flux package](https://www.npmjs.com/package/flux)

싱글톤 : 하나의 프로그램 내에서 하나의 인스턴스만을 생성해야만 하는 상황 (http://itdp1024.tistory.com/22, http://egloos.zum.com/sakula99/v/2971297)

상단 [오버뷰](http://haruair.github.io/flux/docs/overview.html#content)와 아직 업데이트 되지 않은 [ToDo 튜토리얼](http://haruair.github.io/flux/docs/todo-list.html#content)의 한글 번역페이지
	
[GitHub Repository First Commit](https://github.com/studiogaram/toClear)


##2일차 : First Commit
Webpack, 등 개발 레포지토리 세팅

###es6 export default은 무엇인가?
**a.js**

	export foo = 1;
	export default 2;

**b.js**

	import {foo} from 'a';
	import bar from 'a';
	// foo = 1
	// bar = 2
	
[Reference](http://ohgyun.com/588)

### Set Dependency
기존의 flack에서 react, webpack을 디펜던시로, 추가적으로 flux 플러그인 탑재
기존에 비해 필요 없는 디펜던시 삭제, 또한 dev-dependency에 필요한 것 추가

##3일차 : Structure 
#####Store
App의 데이터가 보관되는 곳, 한 스토어가 다른 스토어를 의존하는 경우 디스패처의 waitFor 사용해야 함. 한 스토어에는 한가지 타입만. 데이터 외에도 어플리케이션 상태를 저장가능
#####Action
뷰에서 일어나는 액션, 서버에서 일어나는 액션 2가지. 왠만하면 콜백 X, 
#####Components
리액트 만드는것 대로 스마트-더미 컴포넌트 구조로. 뷰, 컨트롤러뷰 모두 들어감. 스마트 컴포넌트는 스토어 참조 가능. 여러개 스토어 갖는것도 오케이. 


###object-assign을 사용하는 이유
mutable 하지 않게 함으로써, 함수나 변수 등의 데이터가 사용 중에 의도치 않게 변경되는 것을 막기 위해서, 그래서 하나를 만들어 두고 clone을 때려 그걸 씀.
[Reference1](http://stackoverflow.com/questions/12207757/why-do-immutable-objects-enable-functional-programming) [Reference2](http://jlongster.com/Using-Immutable-Data-Structures-in-JavaScript) 

EventEmitter는 node에서 쓰던 [이벤트 발생/처리 플러그인](http://bcho.tistory.com/885) 왜 이제까지 안썼지?

###Folder Structure
* bundle.js
* /src
	* /components
	* /stores
	* /actions
	* /dispatcher
	* /styles
	* main.js
	
###Function Structure
- CreateList
- EditList
- RemoveList
- CompleteList
- SelectList
(List는 하위 List 한단계까지 가져야 하므로… 이걸 어떻게 처리할까?)
- TabView

###List Struct
- ID
- completed
- text
- hasChild (자식이 있다면, 부모의 state에 자식의 state도 영향 받음)
- isChild (자식인지 아닌지 구별, 자신의 child를 만들 수 있는지 구별)


##4일차 : Structure 


##5일차 Add New

React Developer Plugin
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi

KeyMirror
https://sdgluck.github.io/2015/08/12/key-mirrors/

ClassNames > Dynamic class names with ES2015
https://github.com/JedWatson/classnames

PropTypes>
https://facebook.github.io/react/docs/reusable-components-ko-KR.html

isChild, hasChild
true, false - > 자식이며 
childeren - false
childeren [1,2,3,4]
children [

호이스트란, 변수의 정의가 그 범위에 따라 선언과 할당으로 분리되는 것을 의미합니다. 즉, 변수가 함수내에서 정의되었을 경우 선언이 함수의 최상위로, 함수 바깥에서 정의되었을 경우는 전역 컨텍스트의 최상위로 변경됩니다. 
값 할당 전에 선언을 미리 최상위에서 하는 습관을 들이자.


dynamic children 
http://facebook.github.io/react/docs/multiple-components.html#dynamic-children




##6일차
lodash (https://lodash.com/docs#every)




##9일차
테스트 케이스 (http://www.slideshare.net/dhrim/ss-14990143)
재사용, 자동화 가능한 녀석
Testing Flux Application (https://facebook.github.io/react/blog/2014/09/24/testing-flux-applications.html)





##10일차
4/27

why require to import? es6.
ES6 Grammar (http://cheng.logdown.com/posts/2015/09/29/converting-es5-react-to-es6)
http://mobicon.tistory.com/463

하지만 저 내용 외에도 다양하게 바꿀 부분들이 존재함 (map, filter, array 부분 등)
우선 React.createClass()로 진행되던 것을 export default class Header extends Components~ 형식으로 바꾸는 등…(왜 개인실습할땐 잘 쓰던걸 갑자기 이렇게 es5로 썼는지는 아직도 이해가 안간다. -_-;;)
PropTypes가 있다. 이 부분을 프로젝트에 적용해서, prop변수타입이나 존재여부를 체크할 수 있도록 해야 할듯.

var vs if vs let

var a = 5;
var b = 10;

if (a === 5) {
  let a = 4; // The scope is inside the if-block
  var b = 1; // The scope is inside the function

  console.log(a);  // 4
  console.log(b);  // 1
} 

console.log(a); // 5
console.log(b); // 1

https://hacks.mozilla.org/2015/07/es6-in-depth-let-and-const/


Airbnb Lint
Airbnb Javascript Style Guide https://github.com/airbnb/javascript#arrow-functions
React에서의 Airbnb Style Guide http://firejune.com/1795/Airbnb의+React%252FJSX+스타일+가이드
린트하기 위해 ESLINT를 사용했었으나, Airbnb Style Guide으로 사용하려고 했던 세팅이 잘못되어 다시 세팅하고 Lint를 진행했다. (http://eslint.org/docs/user-guide/configuring#extending-configuration-files) 
for문과 module.export (10.1) 에서 의문점 생김, 또한 let->const에서 이 부분을 const로 바꿔도 되는지에 대한 의문 들음, 또한 shorthand? 이것도. (해결책 서술 바람)


##11일차
테스트케이스와 여러가지 기타등등
http://webframeworks.kr/tutorials/react/testing/



Reference

reactDnd (drag n drop)
http://gaearon.github.io/react-dnd/examples-chessboard-tutorial-app.html
##12일차
[testcase for flux with jest1]
(https://facebook.github.io/react/blog/2014/09/24/testing-flux-applications.html)

[testcase for flux with jest2](https://quickleft.com/blog/testing-flux-applications/)

[testcase for react with jest](https://facebook.github.io/jest/docs/getting-started.html)

##13일차 (마지막날)

[flux util](https://facebook.github.io/flux/docs/flux-utils.html) 아아 컨테이너!! 아아 리듀스 스토어!! 

[Reduxjs](http://redux.js.org/)

All of my test codes in this project is broken because of applying material-ui.