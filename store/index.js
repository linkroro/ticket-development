var dayjs = require('dayjs')

const data = []
const randomSold = (min, max) => {
  const ran = Math.floor((Math.random() * max) + min);
  return ran === min ? 0 : ran
}
for(let i=0; i<4;i++){
  for(let j=0; j<4;j++){
    let ticketType = 'A'
    let sold =  randomSold(0,10)
    let price= 5000;
    if(i==1){
      ticketType = 'B';
      sold =  randomSold(1,20)
      price= 2500;
    }
    else if(i==2){
      ticketType = 'C'
      sold = randomSold(1,30);
      price= 1000;
    }
    else if(i==3){
      ticketType = 'D'
      sold =  randomSold(2,40);
      price = 500;
    }
    data.push({
      ticketType: ticketType,
      price: price,
      sold: sold,
      date: dayjs().add(j, 'day').format('DD-MM-YYYY'),
    })
}
}

export const state = () => ({
    constTicketData: data,
    ticketData: data
  })

export const getters = {
  GET_CONST_TICKETS(state) {
    return state.constTicketData;
  },
  GET_TICKETS(state) {
    return state.ticketData;
  },
}


const compare = ( a, b ) => {
  if ( a.ticketType < b.ticketType ){
    return -1;
  }
  if ( a.ticketType > b.ticketType ){
    return 1;
  }
  return 0;
}

const isActive = (sold, ticketType) => {
  if(ticketType === 'A') return sold !== 10;
  else if(ticketType === 'B') return sold !== 20;
  else if(ticketType === 'C') return sold !== 30;
  else if(ticketType === 'D') return sold !== 40;
  return false;
}
export const mutations = {
    SET_TICKETS(state, data) {
      return state.ticketData = data;
    },
    FilTER_TICKET(state, {date, ticketType = [], active= ''}){
      let temp = JSON.parse(JSON.stringify(state.constTicketData));
      if(date !== 'Invalid Date'){
        temp = temp.filter((item)=>{
          return item.date === date;
        })
      }

      if(ticketType.length !== 0){
        const fiilterType = []
        ticketType.forEach(element => {
          temp.forEach(item =>{
            if(item.ticketType === element){
              fiilterType.push(item);
            }
          })
        });
        temp = fiilterType.sort(compare);
      }

      if(active !== '' && active !== null){
        temp = temp.filter(item => {
          if(active)
            return isActive(item.sold, item.ticketType);
          else
            return !isActive(item.sold, item.ticketType);
        })
      }
      return state.ticketData = temp;
    }
}