
class CouponDto {

    id;
    title;
    code;
    discount;
    minPurchase;
    maxDiscount;
    startDate;
    endDate;
    type;
    status;

    constructor(data) {
        this.id = data._id;
        this.title = data.title;
        this.discount = data.discount;
        this.minPurchase = data.minPurchase;
        this.maxDiscount = data.maxDiscount;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.type = data.type;
        this.status = data.status
    }

}

module.exports = CouponDto;