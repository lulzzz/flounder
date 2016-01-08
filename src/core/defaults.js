const defaults = {
    classes : {
        flounder    : '',
        hidden      : 'flounder--hidden',
        selected    : 'flounder__option--selected',
        wrapper     : ''
    },
    data                : [],
    multiple            : false,
    multipleTags        : false,
    multipleMessage     : '(Multiple Items Selected)',
    onClose             : function(){ },
    onComponentDidMount : function(){ },
    onInit              : function(){ },
    onOpen              : function(){ },
    onSelect            : function(){ },
    placeholder         : 'Please choose an option',
    search              : false
};

export default defaults;
