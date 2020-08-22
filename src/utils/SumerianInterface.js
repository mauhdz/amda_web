export const addSumerianListener= (channelName,callback)=>{
    if (((window.controller || {}).sumerian || {}).SystemBus) {
        window.controller.sumerian.SystemBus.addListener(channelName, callback);
    }
};

export const removeSumerianListener= (channelName,callback)=>{
    if (((window.controller || {}).sumerian || {}).SystemBus) {
        window.controller.sumerian.SystemBus.removeListener(channelName, callback);
    }
};


export const emitSumerianMessage= (channelName, data)=>{
    if (((window.controller || {}).sumerian || {}).SystemBus) {
        window.controller.sumerian.SystemBus.emit(channelName,data)
    }
};

