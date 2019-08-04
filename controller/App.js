import PlotWrapper from '../plot/PlotWrapper.js';
import { bisection } from '../function/bisection.js';
import { newton } from '../function/newton.js';

export default class App {
    constructor(funcString = 'x*x-2', bisStart, bisEnd, newStart, margin) {
        console.log({ funcString, bisStart, bisEnd, newStart });
        this.funcString = funcString;
        const func = new Function('x', 'return ' + funcString);


        this.bisData = bisection(func, margin, Number(bisStart), Number(bisEnd));
        console.log(this.bisData)
        this.bisectionPlot = new PlotWrapper(document.createElement('div'))
            .setTitle('二分法')
            .curveOf(funcString)
            .rangeOf([this.bisData[0].xStart, this.bisData[0].xEnd])
            .render();

        this.newData = newton(func, margin, Number(newStart));
        this.newtonPlot = new PlotWrapper(document.createElement('div'))
            .setTitle('ニュートン法')
            .curveOf(funcString, this.newData[0].currentX)
            .rangeOf([0, this.newData[0].currentX], this.newData[0].currentY)
            .render();

        this.bisectionPlot.linkTo(this.newtonPlot);
        this.newtonPlot.linkTo(this.bisectionPlot);

        this.stepInput = this.createStepInput(this.bisData.length > this.newData.length ? this.bisData.length : this.newData.length);
        this.graphDiv = document.createElement('div');
        this.infoDiv = document.createElement('div');
        this.graphDiv.append(this.bisectionPlot.getElement(), this.newtonPlot.getElement());
        this.graphDiv.style.display = 'flex';
        this.graphDiv.style.justifyContent = 'center';
        this.graphDiv.style.flexWrap = 'wrap';
        this.stepInput.addEventListener('input', (e) => {
            this.rerenderByStep(e.target.value)
        });

        this.stepInput.value = 0;
        this.rerenderByStep(0);
    }

    getElement() {
        const div = document.createElement('div');
        div.append(this.graphDiv, this.infoDiv, this.stepInput);
        return div;
    }

    createStepInput(length) {
        const stepInput = document.createElement('input');
        stepInput.setAttribute('type', 'range');
        stepInput.setAttribute('min', '0');
        stepInput.setAttribute('max', length);
        stepInput.style.cssText = `width: 600px; height: 50px`;
        return stepInput;
    }

    rerenderByStep(step) {
        this.infoDiv.innerHTML = '';
        if (this.bisData[step]) {
            const { xStart, xEnd, point } = this.bisData[step];
            this.bisectionPlot
                .clear()
                .lineTo(point)
                .curveOf(this.funcString)
                .rangeOf([xStart, xEnd])
                .render();

            this.infoDiv.innerHTML += `<p>二分法X: ${point}</p>`;
        } else {
            this.infoDiv.innerHTML += `<p>二分法X: ${this.bisData[this.bisData.length-1].point} 完了！</p>`
        }

        if (this.newData[step]) {
            const { currentX = 0, currentY = 0, nextX } = this.newData[step];
            this.newtonPlot
                .clear()
                .lineTo(nextX)
                .curveOf(this.funcString, currentX)
                .rangeOf([0, currentX], currentY)
                .render();

            this.infoDiv.innerHTML += `<p>ニュートン法X: ${currentX}</p>`;
        } else {
            this.infoDiv.innerHTML += `<p>ニュートン法X: ${this.newData[this.newData.length-1].currentX} 完了！</p>`
        }
    }
}
