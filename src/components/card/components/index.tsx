export function Chip({type}: {type:string}){

    var typeChip = ''

    if(type === 'water'){
        typeChip = 'bg-blue-400'
    } if(type === 'fire'){
        typeChip = 'bg-red-400'
    } if(type === 'grass'){
        typeChip = 'bg-green-300'
    } if(type === 'poison'){
        typeChip = 'bg-purple-600'
    } if(type === 'flying'){
        typeChip = 'bg-purple-300'
    } if(type === 'bug'){
        typeChip = 'bg-amber-600'
    } if(type === 'electric'){
        typeChip = 'bg-yellow-300'
    } if(type === 'ground'){
        typeChip = 'bg-orange-700'
    } if(type === 'rock'){
        typeChip = 'bg-gray-500'
    } if(type === 'fairy'){
        typeChip = 'bg-pink-400'
    } if(type === 'fighting'){
        typeChip = 'bg-gray-100'
    } if(type === 'psychic'){
        typeChip = 'bg-yellow-100'
    } if(type === 'ice'){
        typeChip = 'bg-blue-600'
    }

    return(
        <div className={` border-1 border-gray-400 w-[80px] p-1 text-center rounded-2xl bg- ${typeChip}`}>
            <p>{type}</p>
        </div>
    )
}