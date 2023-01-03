let tail = document.querySelectorAll('.tail')
let a = [];
let b = [];
let c = [];
let d = [];
let e = [];

for(let i = 0; i<tail.length; i++) {
    if(i<=4){
        a.push(tail[i])
    }else if(i<=9){
        b.push(tail[i])
    }else if(i<=14){
        c.push(tail[i])
    }else if(i<=19){
        d.push(tail[i])
    }else{
        e.push(tail[i])
    }
}

tail = [a, b, c, d, e]

// 처음 두 번 선택은 주변에 영향을 주지 않음.
let count = 0;
// 세 번째부터 누를 경우 상, 하, 좌, 우 영향을 준다.
const base = [[-1, 0], [0, 0], [1, 0], [0, -1], [0, 1]]
const bomb = (e) => {
    if(count<2) {
        if(e.classList[1]!=='boom') {
            e.classList.add('boom')
            count++;
        }else{
            alert("다른 곳을 클릭하십시오")
        }
    }else{
        let num0 = Number(e.id[0])
        let num1 = Number(e.id[1])
        
        for(let i = 0; i < base.length; i++) {
            if((num0+base[i][0])<0||(num0+base[i][0])>4||(num1+base[i][1])<0||(num1+base[i][1])>4||[...tail[num0+base[i][0]][num1+base[i][1]].classList].includes('done')){
                continue;
            }
            if(!([...tail[num0+base[i][0]][num1+base[i][1]].classList].includes('boom'))){
                tail[num0+base[i][0]][num1+base[i][1]].classList.add('boom')  
    
            }else if([...tail[num0+base[i][0]][num1+base[i][1]].classList].includes('boom')){
                tail[num0+base[i][0]][num1+base[i][1]].classList.remove('boom')
            }
        }

        for(let i = -1; i<2; i++) {
            // 세로 빙고    
            if(num1+i<=4&&num1+i>=0){
                const l = [tail[0][num1+i], tail[1][num1+i], tail[2][num1+i], tail[3][num1+i], tail[4][num1+i]]
                if(l.filter(el=>[...el.classList].includes('boom')).length===5) {
                    for(let j = 0; j< 5; j++) {
                        tail[j][num1+i].classList.add('done')
                    }
                }
            }
            // 가로 빙고
            if(num0+i<=4&&num0+i>=0){
                const w = [tail[num0+i][0], tail[num0+i][1], tail[num0+i][2], tail[num0+i][3], tail[num0+i][4]]
                if(w.filter(el=>[...el.classList].includes('boom')).length===5) {
                    for(let j = 0; j< 5; j++) {
                        tail[num0+i][j].classList.add('done')
                    }
                }
            }
        }
        // 대각선 빙고
        const rs = [tail[0][0], tail[1][1], tail[2][2], tail[3][3], tail[4][4]]
        if(rs.filter(el=>[...el.classList].includes('boom')).length===5){
            for(let j = 0; j< 5; j++) {
                tail[j][j].classList.add('done')
            }
        }

        const ls = [tail[0][4], tail[1][3], tail[2][2], tail[3][1], tail[4][0]]
        if(ls.filter(el=>[...el.classList].includes('boom')).length===5){
            for(let j = 0; j< 5; j++) {
                tail[j][4-j].classList.add('done')
            }
        }
        count++;   
    }
    
    if(count === 5) {
        count = 2;
    }

    //! 내 실력으론 완성 불가

    // for(let i=0; i<tail.length; i++) {
    //     for(let j = 0; j<tail.length; j++) {
    //         if([...tail[i][j].classList].includes('ex')){
    //             tail[i][j].classList.remove('ex')
    //         }
    //     }
    // }
    // for(let i=0; i<tail.length; i++) {
    //     for(let j = 0; j<tail[4-i].length; j++) {
            
    //         if(count === 2){
    //             // count가 2일 경우 빙고x, 지우기
    //             if([...tail[4-i][4-j].classList].includes('boom')){
    //                 if(i>0&&i<j){
    //                     tail[4-i+1][4-j].classList.add('ex')
    //                 }else if(j>0&&j<i) {
    //                     tail[4-i][4-j+1].classList.add('ex')
    //                 }
    //             }
    //         }else if(count === 3) {
    //             // count가 3일 경우 빙고x, 지우거나 채우기
    //             if([...tail[4-i][4-j].classList].includes('boom')){
    //                 if(i>0&&i<j){
    //                     tail[4-i+1][4-j].classList.add('ex')
    //                 }else if(j>0&&j<i) {
    //                     tail[4-i][4-j+1].classList.add('ex')
    //                 }
    //             }
    //         }else if(count === 4) {
    //             // count가 4일 경우 빙고0

    //         }
    //     }
    // }
    
    
   
}
// 세 번째부터 세 번째 둘때마다 빙고가 되게 한다.
// 빙고가 된 줄은 영향을 받지 않는다