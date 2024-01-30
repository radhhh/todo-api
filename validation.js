function validate(todo){
    if(todo.name && typeof todo.name == 'string'
        && todo.createdDate && typeof todo.createdDate === 'number'
        && ((todo.status && typeof todo.status === 'string') || todo.status === undefined)
        && ((todo.dueDate && typeof todo.dueDate === 'number') || todo.dueDate === undefined) 
        && ((todo.tags && Array.isArray(todo.tags)) || tags === undefined)
        && ((todo.type && typeof todo.type === 'string') || todo.type === undefined)){
        const data = {
            name: todo.name,
            status: todo.status,
            createdDate: new Date(todo.createdDate * 1000),
        }
        if(todo.dueDate) data.dueDate = new Date(todo.dueDate * 1000);
        if(todo.tags) data.tags = todo.tags;
        if(todo.type) data.type = todo.type;
        if(todo.description) data.description = todo.description;
        console.log("valid");
        return data;
    }
    else return undefined;
}

module.exports = validate;