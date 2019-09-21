/**输出占位符内容 */
let place_holder_str = '----------------------------------------------------------------';

/**自动答题*/
function autoAnswer() {
    console.info("正在获取试题及答案...");
    //从缓存中获取试题及答案
    let answers = JSON.parse(localStorage.getItem('loca-question-answer'));
    if (answers && answers.length > 0) {
        console.info("试题及答案获取成功，共 " + answers.length + " 题...");
        console.info("自动答题中...");
        console.info(place_holder_str);
    } else {
        console.error("未找到试题及答案，请检查操作及步骤是否无误...");
        return;
    }

    //获取考试区试题及选项
    let test_questions = window.top.w_main.frames[2].w_lms_content.w_sco.w_right.document.querySelectorAll('#tblDataList tbody tr');
    console.log(test_questions)

    //遍历答案，并自动答题
    for (let i = 0; i < answers.length; i++) {
        let item = answers[i];
        for (let j = 2; j < test_questions.length; j += 5) {
            //找到匹配的试题
            if (test_questions[j].innerText == item[1]) {
                console.log(i + 1 + '. ' + item[1]);
                //找到匹配的答案
                //遍历选项
                for (let x = 0; x < test_questions[j + 2].children.length; x++) {
                    //获取匹配试题下的选项区子节点
                    let x_item = test_questions[j + 2].children[x];
                    if (x_item.innerText == item[7]) {
                        console.log('答案：[', item[7], "] 将自动选中...");
                        //找到答案选项，并选中
                        test_questions[j + 2].children[x - 2].children[0].click();
                        console.log("已选中...");
                        console.info(place_holder_str);
                    }
                }
            }
        }
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