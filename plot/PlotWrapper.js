export default class PlotWrapper {
    constructor(dom) {
        this.dom = dom;
        this.functionPlot = null;
        this.title = '';
        this.dataArray = [];
        this.annotationArray = [];
        this.link = [];
    }

    clear() {
        this.dataArray = [];
        this.annotationArray = [];
        // this.title = '';
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    linkTo(fp) {
        if (!this.functionPlot || !fp.functionPlot) throw new Error('No FunctionPlot');
        this.link.push(fp.functionPlot);
        return this;
    }

    lineTo(pos) {
        this.dataArray.push({
            vector: [0, 200],
            offset: [pos, -100],
            graphType: 'polyline',
            fnType: 'vector',
            color: '#dc143c'
        });

        return this;
    }

    curveOf(func, lineX) {
        this.dataArray.push({
            fn: func,
            color: '#1e90ff',
            derivative: {
                fn: '2 * x',
                x0: lineX
            }
        });

        return this;
    }

    rangeOf([xStart, xEnd], yEnd) {
        this.dataArray.unshift({
            fn: yEnd ? String(yEnd) : '100',
            range: [xStart, xEnd],
            closed: true,
            color: 'rgba(255,192,203,0.2)'
        });

        if(!yEnd) {
            this.dataArray.unshift({
                fn: '-100',
                range: [xStart, xEnd],
                closed: true,
                color: 'rgba(255,192,203,0.2)'
            })
        }

        return this;
    }

    render() {
        this.functionPlot = functionPlot({
            target: this.dom,
            title: this.title,
            width: '600',
            height: '400',

            grid: true,
            data: this.dataArray,
            annotations: this.annotationArray,
            // disableZoom: true,
        });

        if (this.link.length) {
            this.functionPlot.addLink(...this.link)
        }

        return this;
    }

    getElement() {
        return this.dom;
    }
}
