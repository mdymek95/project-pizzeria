import {settings, select} from '../settings.js';
import BaseWidget from './BaseWidget.js';


class AmountWidget extends BaseWidget{
  constructor(element){
    super(element, settings.amountWidget.defaultValue);

    const thisWidget = this;

    thisWidget.getElements(element);
    thisWidget.initActions();
  }
  
  getElements(){
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  isValid(value){
    return !isNaN(value) && settings.amountWidget.defaultMin <= value && settings.amountWidget.defaultMax >= value;
  }

  renderValue(){
    const thisWidget = this;

    thisWidget.dom.input.value = thisWidget.correctValue;
  }

  setValue(value){
    const thisWidget = this;

    const newValue = parseInt(value);

    if(
      thisWidget.value !== newValue
      && !isNaN(newValue)
      && settings.amountWidget.defaultMin <= newValue
      && settings.amountWidget.defaultMax >= newValue
    ){
      thisWidget.value = newValue; 
    }
    thisWidget.announce();
  }

  initActions(){
    const thisWidget = this;

    thisWidget.dom.input.addEventListener('change', function(){
      thisWidget.setValue(thisWidget.dom.input.value);
    });

    thisWidget.dom.linkDecrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.dom.linkIncrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
    });
  }
}

export default AmountWidget;