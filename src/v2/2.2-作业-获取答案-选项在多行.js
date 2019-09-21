/**输出占位符内容 */
if (!window.place_holder_str) {
    place_holder_str = '----------------------------------------------------------------';
}

/**获取答案 */
function getAnswers() {
    //找到试题及答案Dom纯文本内容
    let answers = window.top.w_main.frames[2].w_lms_content.w_sco.document.querySelector("form[name='form1'] table").innerText;

    if (answers && answers.length > 0) {
        console.info("已找到试题及答案，正在对结果进行处理...");
        console.info(place_holder_str);
    }
    else {
        console.error("未找到试题及答案，请检查操作及步骤是否无误...");
        return;
    }

    //按四个换行符分割为数组
    answers = answers.split(/[\n\n\n\n]/);
    //去除数组内无效内容
    answers = answers.filter(Boolean);
    // console.info(answers)

    //将旧数组按每9个一组拆分为一个新数组，每9个一组为一道试题
    let new_answers = [];
    for (let i = 0; i < answers.length; i += 9) {
        new_answers.push(answers.slice(i, i + 9));
    }
    // console.info(new_answers)

    //遍历二维数组，获取试题答案
    for (let i = 0; i < new_answers.length; i++) {
        //当前试题
        let question = new_answers[i];
        //当前试题的答案，A/B/C/D
        let q_answer = question[6].substring(6, 7);

        //记录当前试题答案选项
        question.push(q_answer);

        let answer_sign_index = 2 + getAnswerSignIndex(q_answer);

        question.push(question[answer_sign_index].substring(question[answer_sign_index].indexOf(`	(${q_answer}) `) + 5, question[answer_sign_index].length).trim());

        //输出试题及答案内容
        console.info(question[0], question[1]);
        console.info("答案：", question[9], '.', question[10]);
        console.info(place_holder_str);
    }
    console.info('答案处理完毕，存入缓存...');

    localStorage.setItem("local-question-answer", JSON.stringify(new_answers));
    console.info('存入缓存成功，请在新标签页进行<重考>，并执行 <自动完成作业> 脚本 ...');
    console.info(place_holder_str);
}
//答案转ASCII，并返回下一选项，用于试题答案内容获取
function getNextAnswerSign(text) {
    return String.fromCharCode(text.charCodeAt() + 1);
}
//获取答案标志索引
function getAnswerSignIndex(text) {
    return text.charCodeAt() - 65;
}

/**初始化 */
function init() {
    console.clear();
    console.info(place_holder_str);
    console.info("正在获取试题和答案...");
    console.info(place_holder_str);

    getAnswers();
}

init();