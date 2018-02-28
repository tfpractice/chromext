import moment from 'moment';

export const searchUrl = ({ url }) =>
  new Promise((resolve, reject) => {
    window.chrome.history.search({ text: url }, resolve);
  });

export const lastVisit = ({ lastVisitTime }) => moment(lastVisitTime);
export const isSame = a => b => moment(a).isSame(b);
export const isBefore = a => b => (moment(a).isBefore(b) ? -1 : 1);
export const compare = a => b => (isSame(a)(b) ? 0 : isBefore(a)(b));
export const compareBin = (a, b) => compare(a)(b);

// const hObj = {
//   id: '1812',
//   lastVisitTime: 1519780032924.145,
//   title: 'build a js code analysis - Google Search',
//   typedCount: 0,
//   url:
//     'https://www.google.com/search?rlz=1C5CHFA_enUS774US774&q=build+a+js+code+analysis&sa=X&ved=0ahUKEwjf7vPmtcfZAhUom-AKHUr3DJAQ7xYIJigA&biw=1154&bih=655',
//   visitCount: 1,
// };
