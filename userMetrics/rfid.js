//This sample metric will override that which is already defined in main metrics.js
//You can redefine defaults or write your own new custom metrics in 1 or more files in this folder, separate them as you'd like - they all get merged together when the app loads

//you will have to import any used functions from metrics.js this way:
exports.timeoutOffset = require('../metrics.js').timeoutOffset;
exports.futureDateOffset = require('../metrics.js').futureDateOffset;

exports.metrics = {
  RFID_UID : { name:'UID', regexp:/xxxx/i, value:'Card 01'},
  RFID_UID : { name:'UID', regexp:/yyyy/i, value:'Card 02'},
  RFID_UID : { name:'UID', regexp:/xxxx/i, value:'Card 03'},
  RFID_UID : { name:'UID', regexp:/[0-9a-fA-F]+/i, value:'Unknown Card'},
};

//exports.metrics = {
//  RFID_UID:
//  {
//    name: 'UID',
//    regexp: /UID\:([0-9a-fA-F]+)/i,
//    value: '',
//    duplicateInterval: 3600,
//    unit: '',
//    graph: 1,
//    graphOptions:
//    {
//      legendLbl: 'VOLTZ!',
//      lines:
//      {
//        fill: true,
//        lineWidth: 1
//      },
//      yaxis:
//      {
//        min: 0,
//        autoscaleMargin: 0.25
//      }
//    }
//  },
//};

//example of overriding an event
exports.events = {
  RFIDAlert : { label:'RFID : Card Detected', icon:'audio', descr:'Alert sound when RFID Card is detected', 
                                         serverExecute:function(node) { 
                                                if (node.metrics['UID'] && (
                                                           node.metrics['UID'].value == 'Card 01' ||
//                                                           node.metrics['UID'].value == 'Card 02' ||
//                                                           node.metrics['UID'].value == 'Card 03' ||
                                                           node.metrics['UID'].value == 'Card 04'
                                                           ) {
                                                      io.sockets.emit('PLAYSOUND', 'sounds/access_granted.wav'); 
                                                } else {
                                                      io.sockets.emit('PLAYSOUND', 'sounds/access_denied.wav'); 
                                               };                  <-- what is with this semicolon?  
                                         } 
                              },};

//example of defining a property to use anywhere in the app/events or in other custom functions
exports.ONEDAYHOURS = 24;
                                               
//example of defining a custom mote                                               
exports.motes = {
  RFIDMote: {
      label  : 'RFID Sensor',
      icon   : 'icon_sonar.png',   <-- create one
      settings: { lowVoltageValue: '' }, //blank will make it inherit from global settings.json lowVoltageValue, a specific value overrides the general setting, user can always choose his own setting in the UI
  },
}
//example of defining a general purpose function to use in the app/events or in other custom functions
exports.secondsInOneDay = function() {
  var result = exports.ONEDAYHOURS * 3600;
  return result;
};
