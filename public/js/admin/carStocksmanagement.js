//下表示ボタン
const row = document.getElementsByClassName('row');
//オプション表示
const option_hegit = document.getElementsByClassName('option');
//処理切替
const btn_state = document.getElementsByClassName('element_btn');
//各ステータス名
const car_name = document.getElementsByClassName('car_name');
const maker_name = document.getElementsByClassName('maker_name');
const car_state = document.getElementsByClassName('car_state');

const requestXML = new XMLHttpRequest();

let optionstate = [];
rows = Array.from(row);
option_hegits = Array.from(option_hegit);
btn_states = Array.from(btn_state);
car_names = Array.from(car_name);
maker_names = Array.from(maker_name);
car_states = Array.from(car_state);

//リスト表示に関する各要素のステータスを取得
for (let i = 0; i < rows.length; i++) {
  optionstate[i] = 0;
}

//イベント付与:option表示
for (let i = 0; i < rows.length; i++) {
  rows[i].addEventListener('click', function () {
    console.log(i);
    if (optionstate[i] === 0) {
      optionstate[i] = 1;
      option_hegits[i].style.display = 'grid';
    } else {
      optionstate[i] = 0;
      option_hegits[i].style.display = 'none';
    }
  });
}

//イベント付与:処理切替
for (let i = 0; i < btn_states.length; i++) {
  btn_states[i].addEventListener('click', function () {
    const child_nodes = option_hegits[i].querySelectorAll('input');
    const child_button = option_hegits[i].querySelectorAll('button');
    let child_nodes_count = option_hegits[i].querySelectorAll('input').length;
    if (btn_states[i].getAttribute('name') === 'update') {
      btn_states[i].innerText = '確定';
      btn_states[i].name = 'commit';
      //btn_states[i].type = "submit";
      const car_name_text = car_names[i].innerText;
      const maker_names_text = maker_names[i].innerText;
      let car_states_text = car_states[i].innerText;
      car_names[i].innerHTML = "<input type='text' name='car_name' value=" + car_name_text + ' ;>';
      maker_names[i].innerHTML =
        "<input type='text' name='maker_name' value=" + maker_names_text + ' ;>';
      car_states[i].innerHTML =
        "<input type='text' name='maker_name' value=" + car_states_text + ' ;>';
      //console.log(child_nodes);
      for (let j = 0; j < child_nodes_count; j++) {
        child_nodes[j].disabled = false;
      }
    } else if (btn_states[i].getAttribute('name') === 'commit') {
      btn_states[i].innerText = '更新';
      btn_states[i].name = 'update';
      // btn_states[i].type = "button";
      const car_name_text = car_names[i].children;
      const maker_names_text = maker_names[i].children;
      let car_states_text = car_states[i].children;
      //console.log(btn_states[i].value);
      const option = {
        url: '/admin/carStocksManagement.js',
        method: 'POST',
        car_name: car_name_text.item(0).value,
        maker_name: maker_names_text.item(0).value,
        car_state: car_states_text.item(0).value,
        aircon: child_nodes[0].checked,
        powerstee: child_nodes[1].checked,
        powerwidou: child_nodes[2].checked,
        centraldoor: child_nodes[3].checked,
        abs: child_nodes[4].checked,
        airback: child_nodes[5].checked,
        ETC: child_nodes[6].checked,
        keyless: child_nodes[7].checked,
        smartkey: child_nodes[8].checked,
        cd: child_nodes[9].checked,
        md: child_nodes[10].checked,
        dvd: child_nodes[11].checked,
        tv: child_nodes[12].checked,
        navi: child_nodes[13].checked,
        backcamera: child_nodes[14].checked,
        autodoor: child_nodes[15].checked,
        sunroof: child_nodes[16].checked,
        leather: child_nodes[17].checked,
        aero: child_nodes[18].checked,
        alumi: child_nodes[19].checked,
        esc: child_nodes[20].checked,
        tractioncon: child_nodes[21].checked,
        coldareas: child_nodes[22].checked,
        welfare: child_nodes[23].checked,
        lowdown: child_nodes[24].checked,
        nosmoking: child_nodes[25].checked,
        pet: child_nodes[26].checked,
        exclusive: child_nodes[27].checked,
        confirmation: child_nodes[28].checked,
        instruction: child_nodes[29].checked,
        newguarantee: child_nodes[30].checked,
        spare: child_nodes[31].checked,
        stock_id: btn_states[i].value,
      };
      //console.log(option);
      car_names[i].innerHTML = "<p class='car_name'>" + car_name_text.item(0).value + '</p>';
      maker_names[i].innerHTML = "<p class='maker_name'>" + maker_names_text.item(0).value + '</p>';
      car_states[i].innerHTML = "<p class='car_state'>" + car_states_text.item(0).value + '</p>';
      for (let j = 0; j < child_nodes_count; j++) {
        child_nodes[j].disabled = true;
      }
      //request.post("/app/controller/admin/carStocksManagementRouter.js", option);
      requestXML.send();
    }
  });
}

//
