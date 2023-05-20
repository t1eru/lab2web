
class Controller {
    constructor() {
        this.calculator_bits = document.getElementById("calculator-bits");
        this.bitwidget_values = [];

        this.calculator_input_prev = document.getElementById("calculator_input").value;
        this.bitwidget_state = false;
    }
}

//Model
function create_bit_block() {
    for(var i = 0; i < 4; i++) { 
        var bit_decorator_block = document.createElement("div");
        controller.calculator_bits.appendChild(bit_decorator_block)
        bit_decorator_block.setAttribute("class", "w-100 align-items-center m-0 p-0")

        var bit_block = document.createElement("div");
        bit_block.setAttribute("class", "w-100 btn-group center-block")
    
        for(var j = 0; j < 4; j++) {
            var button_value = 15 - (i * 4 + j);
            var new_bit = create_button(button_value);

            new_bit.setAttribute("onclick", "bitfield_inverse(this)");
            new_bit.setAttribute("class", "btn btn-secondary calculator-bit border border-dark button6"); 
            new_bit.setAttribute("id", "calculator-bit" + new_bit.textContent);
            
            new_bit.value = 0;
            bit_block.appendChild(new_bit);
            controller.bitwidget_values.unshift(new_bit)
        }
    
        bit_decorator_block.appendChild(bit_block)
    }
}

function create_button(button_value) {
    var button = document.createElement("button");
    button.textContent = button_value;

    return button;
}

function bitfield_inverse(argument) {

    console.log("bitfield_inverse", argument.textContent, argument.value, typeof(argument.value));
    
    if(argument.value != "0") {
        argument.value = 0;
    } else {
        argument.value = 1;
    }

    console.log("bitfield_inverse", argument.textContent, argument.value, typeof(argument.value));
    bitfield_update(argument);
    
    value = 0;
    controller.bitwidget_values.forEach(function(item, index, array) {
        value += (2 ** index ) * item.value;
    });

    if(value != 0) {
        if(controller.bitwidget_state) {
            document.getElementById("calculator_input").value = controller.calculator_input_prev;
        }

        insert(value, true);
    } else {
        document.getElementById("calculator_input").value = controller.calculator_input_prev;
    }

    console.log(value);
    var tmp = [];
    controller.bitwidget_values.forEach(function(item, index, array) {
        tmp.push(item.value);
    });
    console.log(tmp);
}

function bitfield_update(argument) {
    if(argument.value != "0") {
        argument.setAttribute("class", "btn btn-dark calculator-bit border border-dark button6");
    } else {
        argument.setAttribute("class", "btn btn-secondary calculator-bit border border-dark button6"); 
    }
}

function insert(num, bitwidget_state_l=false) {
    controller.bitwidget_state = bitwidget_state_l;
    if(controller.bitwidget_state === false) {
        bitfieldwidget_clear();
    }

    controller.calculator_input_prev = document.getElementById("calculator_input").value;
    document.getElementById("calculator_input").value = document.getElementById("calculator_input").value + num;
}

function bitfieldwidget_clear() {
    controller.bitwidget_values.forEach(function(item, index, array) {
        
        controller.bitwidget_values[index].value = 0;
        bitfield_update(item);
    });
}

function clean() {
  controller.bitwidget_state = false;
  bitfieldwidget_clear();
  controller.calculator_input_prev = document.getElementById("calculator_input").value;
  document.getElementById("calculator_input").value = "";
}

function back() {
    controller.bitwidget_state = false;
    bitfieldwidget_clear();
    var exp = document.getElementById("calculator_input").value;
    controller.calculator_input_prev = document.getElementById("calculator_input").value;
    document.getElementById("calculator_input").value = exp.substring(0, exp.length-1);
  }
  
  function equal() {
    controller.bitwidget_state = false;
    bitfieldwidget_clear();
    var exp = document.getElementById("calculator_input").value;
    controller.calculator_input_prev = document.getElementById("calculator_input").value;
    if(exp) {
      document.getElementById("calculator_input").value = eval(exp);
    }
  }

  const controller = new Controller();
  create_bit_block();
