export const newton = (func, margin, x) => {
    const result = [];
    let i = 0;
    // 決められたステップ数以内で収束しなかった場合、終了する
    while (i < 1000) {
        // 切片
        const intercept = (x * 2);
        // 現時点のX
        const funcRes = func(x);
        const x2 =  x - funcRes / intercept;

        // グラフ描写用データを用意する
        result.push({
            currentX: x,
            currentY: funcRes,
            nextX: x2,
        });

        if (Math.abs(x2 - x) < margin) break; // 有効桁数内なら終了
        x = x2; // 新たな近似解として設定する
        i++;
    }
    return result;
}
