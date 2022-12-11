function countdownTimer(){
    const enditme = new Date(end_time);
    const nowTime = new Date();
    let difference = enditme - nowTime;
    if(difference >= 0){
        const hour = Math.floor(difference / (1000 * 60 * 60));
        difference -= (hour * (1000 * 60 * 60));
        Math.floor(difference / (1000 * 60));
        difference -= (minutes)
    }else{

    }
}
countdownTimer();