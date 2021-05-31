window.addEventListener('load', function buildDOM(){
    const content = document.querySelector('.content');
    
    const calendarDiv = document.createElement('div');
    const calendarHeader = document.createElement('span');
    const calRight = document.createElement('button');
    const calLeft = document.createElement('button');
    const daysHeader = document.createElement('div')
    

    content.appendChild(calendarDiv);

    //calendarDiv style
    calendarDiv.id = 'calendarDiv';
    calendarDiv.style.height = '80vh';
    calendarDiv.style.width = '80vw';
    calendarDiv.style.position = 'absolute';
    calendarDiv.style.top = '5%';
    calendarDiv.style.left = '10%';
    calendarDiv.style.border = 'solid black 3px'
    calendarDiv.style.backgroundColor = '#f6f6f6';
    calendarDiv.style.display = 'grid';
    calendarDiv.style.gridTemplateColumns = 'repeat(7, 1fr)';
    calendarDiv.style.gridTemplateRows = `10% 3%`;

    //calendar header style
    calHeader = document.createElement('span');
    calHeader.style.height = 50 + '%'
    calHeader.style.gridColumn = '1/8';
    calHeader.style.textAlign = 'center';
    calHeader.style.fontSize = '2rem';

    calHeader.textContent = 'date here'

    calendarDiv.appendChild(calHeader)

     //make next / previous buttons
     calRight.classList.add('nextButton');
     calRight.textContent = 'next';
     calRight.style.float = 'right';
     calRight.style.marginTop = '1rem';
     calRight.style.marginRight = '0.5rem';
     calRight.style.fontSize = '1rem'
 
     calLeft.classList.add('previousButton');
     calLeft.textContent = 'prev';
     calLeft.style.float = 'left';
     calLeft.style.marginTop = '1rem';
     calLeft.style.marginLeft = '0.5rem';
     calLeft.style.fontSize = '1rem';


    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let monthArray = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let num = 6; // 7x6 grid
    let gridArray = [];
    

    //create days header    
        for(let i = 0; i < days.length; i++){
        let daysHeader = document.createElement('div');
        daysHeader.style.border = 'solid black 2px';
        daysHeader.style.rowGap = 0;
        daysHeader.style.textAlign = 'center';
        daysHeader.style.backgroundColor = '#d3d3d3'
        daysHeader.textContent = days[i];
        calendarDiv.appendChild(daysHeader)
        }

        //make calendar grid
        let dateCellNums = 0; //add classlist numbers
        for(let j = 0; j < days.length; j++){
            for(let k = 0; k < num; k++ ){
                const gridDays = document.createElement('div');
                gridDays.classList.add(`gridDays${dateCellNums++}`);
                gridDays.style.border = 'solid black 2px';
                gridDays.style.height = 100 + '%';
                calendarDiv.appendChild(gridDays);
                gridArray.push(gridDays);
            }
        }  
        const getMonth = ()=>{
            return new Date().getMonth();
        }

        const changeMonth = (n)=>{
            return n;
        }

        const getYear = (year)=>{
            return year;
        }

        const changeYear = (yy)=>{
            return yy;
        }

        const showMonthHead = (header, month, year)=>{
            let date = new Date();
            header.textContent = `${monthArray[month]} ${year}`;
            header.appendChild(calRight)
            header.appendChild(calLeft)
        }

        const totalDaysInMonth = (month, year)=>{
            return new Date(year, month+1, 0).getDate();
        }

        const getFirstdayOfMonth = (date, y, m)=>{
            date = new Date();
            let firstDayOfMonth = new Date(date.setFullYear(y, m, 1));
            return firstDayOfMonth.toDateString().split(' ');
        }

        const populateCalendardays = (grid, daysOfWeek, fday, daysInMonth)=>{
            let fst;
            let num = 1;

            fst = fday[0];

            console.log(fst)
            for(let i=0; i< daysOfWeek.length; i++){
                for(let j=0; j<grid.length; j++){
                    if(daysOfWeek[j] === fst){
                        console.log('matched')
                        fst = grid.lastIndexOf(grid[j])
                        }
                    }
            }

            let fltrd = grid.filter((el, ind)=>{
                el.textContent = '';
                console.log()
                let last = fst + daysInMonth;
                if(ind >= fst && ind < (last)){
                    el.textContent = num++
                }
            })
        }


        const addContentToCalendarCells = (cells)=>{
            cells.forEach(element => {
                element.addEventListener('click', ()=>{
                    console.log(element)
                    console.log('u clicked cells now add your events for date')
                })
            });
        }

        const control = ()=>{
           showMonthHead(calHeader, getMonth(), getYear(new Date().getFullYear()));
           populateCalendardays(gridArray, days, getFirstdayOfMonth(new Date(), getYear(new Date().getFullYear()), getMonth()), totalDaysInMonth(getMonth(), getYear(new Date().getFullYear())))
        }
        control()

        // change month and year
        let n = getMonth(); 
        let yy = getYear(new Date().getFullYear());
        
        calLeft.addEventListener('click', ()=>{
            n--
            console.log(n)
            showMonthHead(calHeader, changeMonth(n), changeYear(yy)); //playing around with year and month here, almost got it working!!!
            populateCalendardays(gridArray, days, getFirstdayOfMonth(new Date(), changeYear(yy), changeMonth(n)), totalDaysInMonth(changeMonth(n), getYear(new Date().getFullYear())));

            if( n % 12 === 0 ){
                yy = yy-1;
                n = 12;
            }

        })
    
        calRight.addEventListener('click', ()=>{
            n++
            console.log(n)
            if( n % 12 === 0 ){
                yy = yy+1;
                n = 0;   
            }
            
            showMonthHead(calHeader, changeMonth(n), changeYear(yy));
            populateCalendardays(gridArray, days, getFirstdayOfMonth(new Date(), changeYear(yy), changeMonth(n)), totalDaysInMonth(changeMonth(n), getYear(new Date().getFullYear())));

        })
})
