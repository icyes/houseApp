export const sourceWayArray= ['自然上访', '员工邀约', '老客户介绍', '路过', '朋友介绍', '广告媒体', '其他']
// 售卖状态 1-已购买商铺 2-已购买住宅 3-已退卡
export const sellStatus = [
	{index:0,value:1,title:"已购买商铺"},
	{index:1,value:2,title:"已购买住宅"},
	{index:2,value:3,title:"已退卡"}
]

// 认购状态 审核状态 0未审核 1 审核通过 2 审核驳回
export const offerSattus = {
	0:"待审核",
	1:"已通过",
	2:"已驳回"
}

// 年龄
export const Age = ['20-30岁', '31-40岁', '41-50岁', '51-60岁', '60岁以上'];

// 职业
export const professional = [
	"公务员",
	"个体户",
	"服务员",
	"教职工",
	"自由职业者",
	"导游",
	"事业单位",
	"商业职员",
	"医护人员",
	"普通职员",
	"退休职工"
]

// 家庭结构
export const family = [
	"单生",
	"二口之家",
	"三口之家",
	"三代同堂",
	"其他结构"
]

// 置业动机
export const realEstate = [
	"自住",
	"改善",
	"自营",
	"投资"
]

// 客户来源
export const customerSource = [
	'自然上访', '员工邀约', '老客户介绍', '路过', '朋友介绍', '广告媒体', '其他'
]

// 产品需求
export const productDemand = [["商业","住宅"], ["凤大公路底商", "购物中心商铺", "主题街区商铺", "办公"]]
// ,["高层", "洋房", "排屋", "公寓"]


// 
export const statusArray= ['来电', '认筹', '签约', '购买']

// 性别
export const gender = ["男","女"]

// 住宅需求
export const residentialDemand = ["40m²以下","40-60m²","60-80m²","80-100m²","110m²以下","110m²以上", "110-130m²", "130-150m²", "150-200m2", "200m²以上"]


// 商业需求
export const businessDemand = ["40m²以下", "40-60m²", "60-80m²", "80-100m²", "100m²以上"]

// 住宅楼层
export const floor = ["-1F","1F","2-5F", "6-10F", "11-15F", "16-20F", "21楼以上"]

// 商业价格
export const businessPrise = ["8000-10000元", "10000-15000元", "15000-20000元", "20000-25000元", "25000-30000元", "30000元",
	"4000元以上"
]

// 住宅价格
export const residentialPrice = ["4000-4500元", "4500-5000元", "5000-6000元", "6000-7000元", "10000元以上"];

// 客户意向
export const customerIntention = ["A级", "B级", "C级", "D级"]

// 付款方式
export const payment = ["一次性付款", "银行按揭", "公积金", "组合"]
