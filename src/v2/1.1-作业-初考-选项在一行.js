/**输出占位符内容 */
if (!window.place_holder_str) {
    place_holder_str = '----------------------------------------------------------------';
}

/**自动答题*/
function autoAnswer() {
    console.info("自动答题中...");
    console.info(place_holder_str);

    //获取考试区试题及选项
    let test_questions = window.top.w_main.frames[2].w_lms_content.w_sco.w_right.document.querySelectorAll('#tblDataList tbody tr');
    console.log(test_questions)


    //遍历试题并自动答题
    for (let j = 2; j < test_questions.length; j += 5) {
        //找到试题
        console.log((j - 2) / 5 + 1 + '. ' + test_questions[j].innerText);
        //找到第一个选项并选中
        test_questions[j + 2].children[0].children[0].click();
        console.log("已选中...");
        console.info(place_holder_str);
    }

    //执行检查答题情况方法
    console.log('正在检查未完成的题目...');
    window.top.w_main.frames[2].w_lms_content.w_sco.w_right.checkAnswerProg();
    console.log('自动答题完成，请交卷...');
    console.info(place_holder_str);
}

/**初始化 */
function init() {
    console.clear();
    console.info(place_holder_str);
    console.info("即将进行自动答题...");
    console.info(place_holder_str);

    autoAnswer();
}

init();