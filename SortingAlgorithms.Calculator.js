///////////////////////////////////////////// ADAPTIVENESS /////////////////////////////////////////////
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu_arrow');
    if (menuArrows.length > 0) {
        for (let i = 0; i < menuArrows.length; i++) {
            const menuArrow = menuArrows[i];
            menuArrow.addEventListener('click', function(e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }
} else {
    document.body.classList.add('_pc');
}
////////////////////////////////////BURGER//////////////////////////////////////////

const iconMenu = document.querySelector('.header_icon');
const menuBody = document.querySelector('.header_nav');
if (iconMenu) {
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


////////////////////////////////////ALGORITHMS//////////////////////////////////////////
const shuffle = function(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let tmp = arr[i]
        let rnd = Math.floor(Math.random() * (i + 1))

        arr[i] = arr[rnd];
        arr[rnd] = tmp;
    }
    return arr;
}

function onSubmitOne(event, form) {
    event.preventDefault();

    const fe = form.elements
    const minValue = fe.minValue.value
    const maxValue = fe.maxValue.value
    const array1 = Array.apply(null, {length: maxValue}).map((_, i) => i).slice(minValue);
    const mixedArray1 = shuffle(array1);
    const initArr = document.getElementById('initArr')
    initArr.value = mixedArray1
}

function toNumberArr(str) {
    if (!str || typeof str !== 'string') {
        return []
    }
    return str.split(',').map(s => Number(s))
}

function onSubmitThree(event) {
    event.preventDefault();

    const mixedValue = document.querySelector('textarea[name="mixedValue"]').value
    const numberArr = toNumberArr(mixedValue)
    const order = document.querySelector('input[name="order"]:checked').value
    const sortType = document.querySelector('option[name="sortType"]:checked').value

    let sortedArray2 = (order === 'ascending') ? sort(numberArr, sortType, order) : sort(numberArr, sortType, order).reverse()

    const formThree = document.querySelector('.form_four')
    const  formThreeContent = formThree.innerHTML
    formThree.innerHTML =
        `<div class="part_of_form_four"><label for="resultArr">Сортированый массив</label>
         <textarea id="resultArr" name="resultValue">${sortedArray2}</textarea>
         <br/>
         <p>Вид сортировки: ${sortType}</p>
         <br/>
         <p>Порядок: ${order}</p></div>`;
}

const sorts = {
    InsertionSort: insertionSort,
    BubbleSort: bubbleSort,
    SelectionSort: selectionSort,
    MergeSort: mergeSort,
    Heapsort: heapSort,
    Quicksort: quickSort,
    Shellsort: shellSort,
    CombSort: combSort,
}
function sort(array, type) {
    const sortFunc = sorts[type];

    if (!sortFunc instanceof Function) {
        throw new Error ('Invalid sort function!')
    }

    return sortFunc(array)
}


// По возрастанию
// Insertion sort (сортировка вставками, алгоритм устойчивой сортировки)
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i;

        while (j > 0 && arr[j - 1] > current) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = current
    }

    return arr
}

// Bubble sort (cортировка пузырьком, алгоритм устойчивой сортировки)

function bubbleSort(arr) {
const n = arr.length;
for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
        if (arr[j+1] < arr[j]) {
            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }
    }
    return arr
}

// Selection sort (сортировка выбором, алгоритм неустойчивой сортировки)

function selectionSort(arr) {
    const l = arr.length
    for (let i = 0; i < l - 1; i++) {
        let min = i;
        for (let j = i + 1; j < l; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        [arr[i], arr[min]] = [arr[min], arr[i]];
    }
    return arr
}

// Merge sort (Сортировка слиянием, алгоритм устойчивой сортировки)

// leftArr and rightArr are /sorted/

const merge = (leftArr, rightArr) => {
    const output =[];
let leftIndex = 0;
let rightIndex = 0;
while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    const leftEl = leftArr[leftIndex];
    const rightEl = rightArr[rightIndex];

    if (leftEl < rightEl) {
        output.push(leftEl);
        leftIndex++
    } else {
        output.push(rightEl);
        rightIndex++
    }
}
return [...output, ...leftArr.slice(leftIndex), ...rightArr.slice(rightIndex)];
};

// recursive
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }
    const middleIndex = Math.floor(array.length / 2);
    const leftArr = array.slice(0, middleIndex);
    const rightArr = array.slice(middleIndex);
    // const l = mergeSort(leftArr)
    // const r = mergeSort(rightArr)
    // return merge(l, r);
    return merge(mergeSort(leftArr),mergeSort(rightArr));
}

// Heapsort (Пирамидальная сортировка, сортировка кучей, алгоритм неустойчивой сортировки)

function heapSort(array) {
    const a = [...array];
    let l = a.length;

    const heapify = (a, i) => {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let max = i;
        if (left < l && a[left] > a[max]) max = left;
        if (right < l && a[right] > a[max]) max = right;
        if (max !== i) {
            [a[max], a[i]] = [a[i], a[max]];
            heapify(a, max);
        }
    };

    for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
    for (let i = a.length - 1; i > 0; i--) {
        [a[0], a[i]] = [a[i], a[0]];
        l--;
        heapify(a, 0);
    }
    return a;
}

// Quicksort (Быстрая сортировка, алгоритм неустойчивой сортировки)

function partition(arr, start, end) {

    const pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
        }
    }

    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    return pivotIndex;
}

function quickSort(arr, start, end) {
    start = typeof start != 'number' ? 0 : start;
    end = typeof end != 'number' ? arr.length - 1 : end;
    if (start >= end) {
        return;
    }

    let index = partition(arr, start, end);

    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
    return arr;
}

//Shell sort (Сортировка Шелла, алгоритм неустойчивой сортировки)

function shellSort(arr) {
    const n = arr.length;
    for (let interval = Math.floor(n / 2); interval > 0; interval = Math.floor(interval / 2)) {
        for (let i = interval; i < n; i++) {
            let temp = arr[i];
            let j;
            for (j = i; j >= interval && arr[j - interval] > temp; j -= interval) {
                arr[j] = arr[j - interval];
            }
            arr[j] = temp;
        }
    }
    return arr;
}

// Comb sort (сортировка расчёской, алгоритм неустойчивой сортировки, улучшенный вариант сортировки пузырьком)
// фактор уменьшения (1,247), comb sort improves on Bubble Sort by using gap of size more than 1

function combSort(array) {
    const factor = 1.247;
    let gapFactor = array.length / factor;

    while (gapFactor > 1) {
        const gap = Math.round(gapFactor);
        for (let i = 0, j = gap; j < array.length; i++, j++) {
            if (array[i] >= array[j]) {
                [ array[i], array[j] ] = [ array[j], array[i] ];
            }
        }
        gapFactor = gapFactor / factor;
    }
    return array;
}

























