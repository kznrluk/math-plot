import App from './controller/App.js';

const app = document.getElementById('app');
let options = {
    funcString: 'x*x-2',
    bisStart: 0,
    bisEnd: 5,
    newStart: 5,
    margin: 0.000001,
}

const rerender = () => {
    app.innerHTML = '';
    try {
        app.append(new App(options.funcString, options.bisStart, options.bisEnd, options.newStart, options.margin).getElement());
    } catch (e) {
        alert('パラメータが不正です。')
        console.error(e)
    }
}

document.getElementById('funcString').addEventListener('change', (e) => {
    options.funcString = e.target.value;
    rerender()
})

document.getElementById('bisStart').addEventListener('change', (e) => {
    options.bisStart = e.target.value;
    rerender()
})

document.getElementById('bisEnd').addEventListener('change', (e) => {
    options.bisEnd = e.target.value;
    rerender()
})

document.getElementById('newStart').addEventListener('change', (e) => {
    options.newStart = e.target.value;
    rerender()
})

document.getElementById('margin').addEventListener('change', (e) => {
    options.margin = e.target.value;
    rerender()
})

rerender();
