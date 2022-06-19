<template>
    <div>
        <div class="invoice" id="printMe">
            <div class="invoice-header">
                <div class="invoice-header__logo">
                    <img src="@/assets/images/invoice-logo.png" alt="">
                </div>
                <div class="invoice-header__info">
                    <span>Тўловчи: <b>{{indata.organization_name}}</b></span>
                    <span>Сана: <b>{{indata.created_at | dateFormat}}</b></span>
                </div>
            </div>
            <div class="invoice-main">
                <div class="invoice-table">
                    <table>
                        <tr>
                            <th>Ариза рақами</th>
                            <td>{{indata.participant_tender_application}}</td>
                        </tr>
                        <tr>
                            <th>Хизмат номи</th>
                            <td>Электрон тендерда иштирок этиш учун таклифини таъминлаш кафолат тўлови({{indata.participant_tender_application}}/12063/1)</td>
                        </tr>
                        <tr>
                            <th>Қабул қилувчи</th>
                            <!-- <td>Курилиш сохасида ахборот-коммуникатсия технологияларини ривожлантириш маркази (307145565)</td> 
                            --> 
                            <td>Shaffof yo'l axborot markazi</td>
                        </tr>
                        <tr>
                            <th>ҳ./р.</th>
                            <td>{{indata.operator_guarantee_account_number}}</td>
                        </tr>
                        <tr>
                            <th>МФО</th>
                            <td>{{indata.operator_bank_code}}</td>
                        </tr>
                        <tr>
                            <th>Миқдори</th>
                            <td>{{indata.amount | priceFormat}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="invoice-foot">
                <p><b>Эслатма:</b></p>
                <ul>
                    <li>Тўловни амалга ошираётганда, инвойсда кўрсатилган "Хизмат номи" ни нусхалаш керак ва тўлов жараёнида киритинг. Агар бу чоралар амалга оширилмаса, тўлов амалга оширилмаган хисобланади.</li>
                    <li>Оператор воситачилик йиғими тендер муддати тугагунга қадар тўланмаган тақдирда, тендер таклифи қабул қилинмайди;</li>
                    <li>Тендер муддати тугагандан сўнг, тўланган миқдор қайтарилмайди. Бундан мустасно агар тўлов тендер якунига қадар амалга оширилган бўлса, унда сўнг иштирокчи иштирок этишдан бош тортган бўлса, у ҳолда тўлов миқдори (банк хизматлари ушланган ҳолда) тендер муддати тугаганидан кейин 1 иш куни ичида талабгорнинг ҳисоб рақамига қайтарилади;</li>
                </ul>
                <p>Аризани ҳолатини шахсий кабинет орқали текширишингиз мумкин: <a href="https://tender.mc.uz/ ">https://tender.mc.uz/ </a></p>
            </div>
        </div>
        <button v-print="printObj" class="invoice-print"><a-icon type="printer" theme="filled" /> Chop etish</button>
    </div>
</template>

<script>
    export default {
        props: {
            indata: {
                type: Object,
                default() {
                    return {}
                }
            },
        },
        data() {
            return {
                printObj: {
                    id: "printMe",
                    popTitle: "тўлов квитанция",
                }
            };
        },
    }
</script>

<style scoped>
.invoice{
    width: 700px;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 32px;
}
.invoice-header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 16px;
}
.invoice-header__logo{
    
}
.invoice-header__logo img{
    height: 60px;
}
.invoice-header__info{
    
}
.invoice-header__info span{
    display: block;
}
.invoice-main{

}
.invoice-table{
    font-size: 14px;
    margin-bottom: 16px;
}
.invoice-table table{
    
}
.invoice-table table td,
.invoice-table table th{
    border: 1px solid #888888;
    padding: 5px 8px;    
}
.invoice-foot{

}
.invoice-foot p{
    margin-bottom: 10px;
}

.invoice-foot ul{
    list-style: decimal;
    padding-left: 12px;
    margin-left: 12px;
}
.invoice-foot ul li{
    list-style: decimal;
    padding: 0 5px;
    margin-bottom: 8px;
}
.invoice-print{
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    border: 1px solid #dedede;
    background: transparent;
    padding: 6px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
}
.invoice-print:hover{
    color: #007d00;
    border: 1px solid #007d00;
}
.invoice-print i{
    margin-right: 4px;
}
</style>