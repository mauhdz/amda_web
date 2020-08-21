export const addListener= (channelName,callback)=>{
    if (((window.controller || {}).sumerian || {}).SystemBus) {
        window.controller.sumerian.SystemBus.addListener(channelName, callback);
    }
};

export const removeListener= (channelName,callback)=>{
    if (((window.controller || {}).sumerian || {}).SystemBus) {
        window.controller.sumerian.SystemBus.removeListener(channelName, callback);
    }
};


export const emit= (channelName, data)=>{
    if (((window.controller || {}).sumerian || {}).SystemBus) {
        window.controller.sumerian.SystemBus.emit(channelName,data)
    }
};

