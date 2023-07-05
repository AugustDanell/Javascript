function bfs(adj_list, start, end){
    let to_visit = [[start, 0]];
    visited = new Map();
    while (to_visit.length > 0){
        let current_package = to_visit.shift();
        let current_node = current_package[0];
        let current_depth = current_package[1];
        if(visited.has(current_node)){
            continue;
        }
        else{
            visited.set(current_node, true);
        }
        
        if (current_node == end){
            return current_depth;
        }
        next_nodes = adj_list[current_node];
        for(let i = 0; i < next_nodes.length; i++){
            next_node = next_nodes[i];
            to_visit.push([next_node, current_depth +1]);
        }
    }
}

triangle_graph = {
    1:[2, 3],
    2:[1,3],
    3:[1,2]
}

console.log(bfs(triangle_graph, 1, 3))
