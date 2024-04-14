const Form=document.getElementById('tax-calculator');
const closeButton=document.getElementById('modal-close-button');
const Modal=document.getElementById('modal');
const grossAnnualIncomeInput=document.getElementById('gross-annual-income');
const extraIncomeInput=document.getElementById('extra-income');
const ageGroupInput=document.getElementById('age-group');
const totalApplDeducInput=document.getElementById('total-appl-deduc');

Form.addEventListener('submit',function (e){
    e.preventDefault();
    removeErrors();
    const regex=new RegExp(',','g');
    let grossAnnualIncome=Number(grossAnnualIncomeInput.value.replace(regex,''));
    let extraIncome=Number(extraIncomeInput.value.replace(regex,''));
    let ageGroup=ageGroupInput.value;
    let totalApplDeduc=Number(totalApplDeducInput.value.replace(regex,''));
    if(valuesCorrect(grossAnnualIncome,extraIncome,totalApplDeduc)){
        document.getElementById('overall-income').innerHTML=calculateTotalIncome(grossAnnualIncome,extraIncome,ageGroup,totalApplDeduc).toString();
        Modal.style.display='flex';
        e.target.reset();
    }
});

closeButton.addEventListener('click',function (){
    Modal.style.display='none';
});

const gaeError=document.getElementById('gai-error');
const eiError=document.getElementById('ei-error');
const tadError=document.getElementById('tad-error');

function valuesCorrect(grossAnnualIncome,extraIncome,totalApplDeduc){
    let isCorrect=true;
    if(isNaN(grossAnnualIncome) || grossAnnualIncome < 0){
        gaeError.style.display='block';
        grossAnnualIncomeInput.style.borderColor='red';
        isCorrect=false;
    }
    if(isNaN(extraIncome) || extraIncome < 0){
        eiError.style.display='block';
        extraIncomeInput.style.borderColor='red';
        isCorrect=false;
    }
    if(isNaN(totalApplDeduc) || totalApplDeduc < 0){
        tadError.style.display='block';
        document.querySelector('#tad-error p:nth-child(2)').innerHTML='Please enter numbers greater than 0 only';
        totalApplDeducInput.style.borderColor='red';
        isCorrect=false;
    } else if(totalApplDeduc > 150000){
        tadError.style.display='block';
        document.querySelector('#tad-error p:nth-child(2)').innerHTML='Total deduction should be less than or equal to 1,50,000';
        totalApplDeducInput.style.borderColor='red';
        isCorrect=false;
    }
    return isCorrect;
};

function calculateTotalIncome(grossAnnualIncome,extraIncome,ageGroup,totalApplDeduc){
    const overallIncome=grossAnnualIncome+extraIncome-totalApplDeduc;
    let tax=0;
    let isTaxed=overallIncome > 800000;
    if(isTaxed){
        let taxPercent;
        if(ageGroup === '<40'){
            taxPercent=0.3;
        } else if(ageGroup === '>=40&<60'){
            taxPercent=0.4;
        } else{
            taxPercent=0.1;
        }
        tax=taxPercent*(overallIncome-800000);
    }
    const incomeAfterTax=overallIncome-tax;
    return Intl.NumberFormat('en-IN').format(incomeAfterTax.toString());
};

function removeErrors(){
    const inputs=document.querySelectorAll('.input-div div:nth-child(2) ~ *');
    const errorDivs=document.getElementsByClassName('error-div');
    for(let i=0;i<4;i++){
        inputs[i].style.borderColor='darkslategrey';
        errorDivs[i].style.display='none';
    }
}