export const bisection = (func, margin, x1, x2) => {
    if (func(x1) * func(x2) >=0) { // Xに触れていない場合の処理
        return false;
    }

    let c = x1; // 計算の開始地点
    let i = 0;
    const result = [];
    while ((x2 - x1) >= margin) {
        c = (x1 + x2) / 2; // 中間点を求める

        // グラフ描写用のデータを容易する。
        result.push({
            xStart: x1,
            xEnd: x2,
            point: c,
        });

        // 中間点と比較し、新たな中間点を設定する
        if (func(c) * func(x1) <= 0) {
            x2 = c;
        } else {
            x1 = c;
        }
        
        // 決められたステップ数以内で収束しなかった場合、終了する。
        if (i > 1000) {
            break;
        }
        i++;
    }

    return result;
}
