var vm = new Vue({
    el: "#app",
    data: {
        base_url: 'https://app.coderprepares.com/evol/calculator/',
        prop: ['decisiveness', 'creativity', 'kindness', 'activity'],
        dom_init: false, // 初始化dom元素
        nav: 'level', // 导航
        select: {}, // 关卡级联选择
        category: 1, // 类别
        chapter: 1, // 章节
        level: 0, // 关卡
        cards: {}, // 全羁绊信息
        card_list: [], // 全羁绊名称
        company: $.LS.get('company') ? JSON.parse($.LS.get('company')) : { //我的公司
            decisiveness: 0,
            creativity: 0,
            kindness: 0,
            activity: 0
        },
        list: $.LS.get('list') ? JSON.parse($.LS.get('list')) : [], // 我的羁绊
        my_cards: $.LS.get('my_cards') ? JSON.parse($.LS.get('my_cards')) : [], //我的羁绊ID
        login: { // 登录信息
            name: '',
            code: '',
            warning: '',
            history: {},
            option: 'create_user'
        },
        user: { // 用户信息
            name: $.LS.get('name') || '',
            code: $.LS.get('code') || ''
        },
        card_select: { // 羁绊选择信息
            name: '',
            card_id: 0,
            evolved: 0,
            star: 1,
            level: 1,
            decisiveness: 0,
            creativity: 0,
            kindness: 0,
            activity: 0
        },
        //羁绊筛选
        card_filter: {
            category: 0,
            type: 0,
            name: ''
        },
        //批量导入
        batch: {
            option: 'import_data',
            source: 'calculator',
            data: '',
            export: '',
            fail: []
        },
        //关卡计算
        levels: {
            level: {},
            list: [],
            overflow: false,
            multiple: 2,
            cards: [],
            combine: [],
            card: 'my',
            r: 'remain',
            sr: 'remain',
            ssr: 'remain',
            config: false,
            cols: ['decisiveness','creativity','kindness','activity','gain'],
            sort: 'decisiveness_creativity',
            category: 0,
            factor: [0.9, 0.6, 0.3, 0.2],
            company: {
                decisiveness: 0,
                creativity: 0,
                kindness: 0,
                activity: 0
            },
            select: {
                card_id: 0,
                evolved: 0,
                star: 1,
                level: 1,
                decisiveness: 0,
                creativity: 0,
                kindness: 0,
                creativity: 0,
                idx: 0,
                score: 0,
                total: 0,
                category: 0,
                type: 0,
                name: ''
            }
        },
        //票房
        ticket: [],
        today: {},
        tickets: {
            ticket_id: 1,
            category: 1,
            star: 3,
            combine: [],
            ticket: {},
            my: [],
            match: [
                {
                    card_id: 0,
                    evolved: 0,
                    star: 1,
                    level: 1,
                    decisiveness: 0,
                    creativity: 0,
                    kindness: 0,
                    activity: 0,
                    name: '',
                    type: 0,
                    category: 0,
                    total: 0,
                    score: 0
                },
                {
                    card_id: 0,
                    evolved: 0,
                    star: 1,
                    level: 1,
                    decisiveness: 0,
                    creativity: 0,
                    kindness: 0,
                    activity: 0,
                    name: '',
                    type: 0,
                    category: 0,
                    total: 0,
                    score: 0
                },
                {
                    card_id: 0,
                    evolved: 0,
                    star: 1,
                    level: 1,
                    decisiveness: 0,
                    creativity: 0,
                    kindness: 0,
                    activity: 0,
                    name: '',
                    type: 0,
                    category: 0,
                    total: 0,
                    score: 0
                }
            ],
            option: 'my',
            my_company: {
                decisiveness: 0,
                creativity: 0,
                kindness: 0,
                activity: 0
            },
            match_company: {
                decisiveness: 0,
                creativity: 0,
                kindness: 0,
                activity: 0
            },
            company: {
                decisiveness: 0,
                creativity: 0,
                kindness: 0,
                activity: 0,
                option: ''
            },
            select: {
                card_id: 0,
                evolved: 0,
                star: 1,
                level: 1,
                decisiveness: 0,
                creativity: 0,
                kindness: 0,
                creativity: 0,
                idx: 0,
                score: 0,
                total: 0,
                category: 0,
                type: 0,
                name: '',
                option: ''
            }
        },
        ticket_select: {
            ticket_id: 1,
            category: 1,
            star: 3
        },
        reverse: {
            option: 'addup',
            separate: {
                decisiveness: '',
                creativity: '',
                kindness: '',
                activity: ''
            },
            addup: {
                decisiveness: '',
                creativity: '',
                kindness: '',
                activity: ''
            },
            scores: {
                decisiveness: '',
                creativity: '',
                kindness: '',
                activity: ''
            }
        },
        double: {
            cards: [],
            option: 'all',
            my: [],
            sort: -1
        }
    },
    watch: {
        //数据本地存储
        list: function(newVal, oldVal){
            $.LS.set('list', JSON.stringify(newVal));

            this.ticket_combine();
        },
        my_cards: function(newVal, oldVal){
            $.LS.set('my_cards', JSON.stringify(newVal));
        },
        'company.decisiveness': function(newVal, oldVal){
            this.company.decisiveness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            $.LS.set('company', JSON.stringify(this.company));
        },
        'company.creativity': function(newVal, oldVal){
            this.company.creativity = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            $.LS.set('company', JSON.stringify(this.company));
        },
        'company.kindness': function(newVal, oldVal){
            this.company.kindness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            $.LS.set('company', JSON.stringify(this.company));
        },
        'company.activity': function(newVal, oldVal){
            this.company.activity = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            $.LS.set('company', JSON.stringify(this.company));
        },
        //关卡级联选择
        category: function(newVal, oldVal) {
            var category = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            if (!this.select[category][this.chapter]) {
                this.chapter = 1;
            }
        },
        chapter: function(newVal, oldVal) {
            var chapter = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            if (!this.select[this.category][chapter][this.level]) {
                this.level = 0;
            }
        },
        //羁绊选择
        'card_select.name': function(newVal, oldVal) {
            var name = newVal;
            for (id in this.cards) {
                if (name == this.cards[id].name) {
                    this.card_select.card_id = id;
                    break;
                }
            }
        },
        'card_select.card_id': function(newVal, oldVal) {
            var card_id = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            if (this.my_cards.indexOf(card_id) >= 0) {
                for (var i = 0; i < this.list.length; i++) {
                    if (card_id == this.list[i].card_id) {
                        this.card_select.name = this.list[i].name;
                        this.card_select.evolved = this.list[i].evolved;
                        this.card_select.star = this.list[i].star;
                        this.card_select.level = this.list[i].level;
                        this.card_select.type = this.list[i].type;
                        this.card_select.category = this.list[i].category;
                        break;
                    }
                }
            }
            this.update_card_select();
        },
        'card_select.evolved': function(newVal, oldVal) {
            this.card_select.evolved = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_card_select();
        },
        'card_select.star': function(newVal, oldVal) {
            this.card_select.star = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_card_select();
        },
        'card_select.level': function(newVal, oldVal) {
            this.card_select.level = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_card_select();
        },
        //过关羁绊
        'levels.select.card_id': function(newVal, oldVal) {
            var card_id = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            var card = this.cards[card_id];
            if(card){
                this.levels.select.name = card.name;
                this.levels.select.type = card.type;
                this.levels.select.category = card.category;
            }
            
            // if (this.my_cards.indexOf(card_id) >= 0) {
            //     for (var i = 0; i < this.list.length; i++) {
            //         if (card_id == this.list[i].card_id) {
            //             this.levels.select.name = this.list[i].name;
            //             this.levels.select.evolved = this.list[i].evolved;
            //             this.levels.select.star = this.list[i].star;
            //             this.levels.select.level = this.list[i].level;
            //             this.levels.select.type = this.list[i].type;
            //             this.levels.select.category = this.list[i].category;
            //             break;
            //         }
            //     }
            // }
            this.update_combine_select();
        },
        'levels.select.evolved': function(newVal, oldVal) {
            this.levels.select.evolved = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_combine_select();
        },
        'levels.select.star': function(newVal, oldVal) {
            this.levels.select.star = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_combine_select();
        },
        'levels.select.level': function(newVal, oldVal) {
            this.levels.select.level = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_combine_select();
        },
        //票房羁绊
        'tickets.select.card_id': function(newVal, oldVal) {
            var card_id = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            var card = this.cards[card_id];
            if(card){
                this.tickets.select.name = card.name;
                this.tickets.select.type = card.type;
                this.tickets.select.category = card.category;
            }
            // if (this.my_cards.indexOf(card_id) >= 0) {
            //     for (var i = 0; i < this.list.length; i++) {
            //         if (card_id == this.list[i].card_id) {
            //             this.tickets.select.name = this.list[i].name;
            //             this.tickets.select.evolved = this.list[i].evolved;
            //             this.tickets.select.star = this.list[i].star;
            //             this.tickets.select.level = this.list[i].level;
            //             this.tickets.select.type = this.list[i].type;
            //             this.tickets.select.category = this.list[i].category;
            //             break;
            //         }
            //     }
            // }
            this.update_battle_select();
        },
        'tickets.select.evolved': function(newVal, oldVal) {
            this.tickets.select.evolved = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_battle_select();
        },
        'tickets.select.star': function(newVal, oldVal) {
            this.tickets.select.star = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_battle_select();
        },
        'tickets.select.level': function(newVal, oldVal) {
            this.tickets.select.level = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_battle_select();
        },
        //过关分析
        'levels.card': function(newVal, oldVal) {
            if (newVal == 'all') {
                this.levels.r = (this.levels.r == 'remain') ? 'evolved' : this.levels.r;
                this.levels.sr = (this.levels.sr == 'remain') ? 'evolved' : this.levels.sr;
                this.levels.ssr = (this.levels.ssr == 'remain') ? 'evolved' : this.levels.ssr;
            } else {
                this.levels.r = 'remain';
                this.levels.sr = 'remain';
                this.levels.ssr = 'remain';
            }
            this.level_cards();
            this.ticket_cards();
            // this.double_cards();
        },
        'levels.r': function(newVal, oldVal) {
            this.level_cards();
            this.ticket_cards();
            this.double_cards();
        },
        'levels.sr': function(newVal, oldVal) {
            this.level_cards();
            this.ticket_cards();
            this.double_cards();
        },
        'levels.ssr': function(newVal, oldVal) {
            this.level_cards();
            this.ticket_cards();
            this.double_cards();
        },
        'levels.category': function(newVal, oldVal){
            this.double_cards();
        },
        //票房反推
        'reverse.separate.decisiveness': function(newVal, oldVal){
            this.reverse.separate.decisiveness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.separate.creativity': function(newVal, oldVal){
            this.reverse.separate.creativity = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.separate.kindness': function(newVal, oldVal){
            this.reverse.separate.kindness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.separate.activity': function(newVal, oldVal){
            this.reverse.separate.kindness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.addup.decisiveness': function(newVal, oldVal){
            this.reverse.addup.decisiveness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.addup.creativity': function(newVal, oldVal){
            this.reverse.addup.creativity = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.addup.kindness': function(newVal, oldVal){
            this.reverse.addup.kindness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.addup.activity': function(newVal, oldVal){
            this.reverse.addup.activity = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
    },
    methods: {
        //卡组分析
        get_double_tag: function(key){
            var arr = key.split('_');
            return this.get_prop_tag(arr[0]) + '<br>' + this.get_prop_tag(arr[1]);
        },
        sort_double: function(attr){
            this.levels.sort = attr;
            this.double.cards.sort(function(a, b){
                return b[attr] - a[attr];
            });
        },
        sort_double_total: function(){
            var self = this;

            if(self.double.sort == 0){
                self.double.sort = -1;
            } else {
                self.double.sort *= -1;
            }

            self.double.my.sort(function(a, b){
                return self.double.sort * (b.total - a.total);
            });
        },
        show_double: function(){
            // this.double.sort = 0;
            this.levels.config = false;
            this.levels.card = 'all';
            this.levels.r = 'evolved';
            this.levels.sr = 'evolved';
            this.levels.ssr = 'evolved';
            this.double_cards();
            this.nav = 'double';
        },
        double_cards: function(){
            var self = this;
            var my_cards = [];
            var cards = self.cards;
            var factor = self.levels.factor.sort(function(a,b){
                return b - a;
            });
            var my = {};

            for (id in cards) {
                var card = cards[id];
                var prop = self.prop;

                var config = '';
                if (card.type == 3) {
                    config = self.levels.r;
                } else if (card.type == 4) {
                    config = self.levels.sr;
                } else if (card.type == 5) {
                    config = self.levels.ssr;
                } else {
                    continue;
                }

                if(self.levels.category != 0 && self.levels.category != card.category){
                    continue;
                }

                if (config == 'hidden') {
                    continue;
                } else if (config == 'ordinary') {
                    card.evolved = 0;
                    card.star = card.type;
                    card.level = (card.type - 1) * 10;
                } else if (config == 'evolved') {
                    card.evolved = 1;
                    card.star = card.type + 1;
                    card.level = card.type * 10;
                }

                // if (card.type == 1 || card.type == 2) {
                //     card.evolved = 0;
                //     card.star = 1;
                //     card.level = card.type * 5;
                // }

                var data = self.predict_card(card.card_id, card.evolved, card.star, card.level);
                card.total = 0;
                for (var i = 0; i < prop.length; i++) {
                    card[prop[i]] = data[prop[i]];
                    card.total += data[prop[i]];
                }

                var double = {};
                var idx = self.my_cards.indexOf(card.card_id);
                if (idx >= 0) {
                    var my_card = self.list[idx];
                }
                for(var i = 0; i < 4; i++){
                    for(var j = 0; j < 4; j++){
                        if(j != i){
                            var remain = [];
                            for(var k = 0; k < 4; k++){
                                if(k != i & k != j){
                                    remain.push(card[prop[k]]);
                                }
                            }

                            var key = prop[i] + '_' + prop[j];
                            double[key] = Math.round(
                                card[prop[i]] * factor[0] + 
                                card[prop[j]] * factor[1] + 
                                Math.max(remain[0], remain[1]) * factor[2] + 
                                Math.min(remain[0], remain[1]) * factor[3]
                            );

                            if(!my[key]){
                                my[key] = [];
                            }

                            if(idx >= 0){
                                remain = [];
                                for(var k = 0; k < 4; k++){
                                    if(k != i & k != j){
                                        remain.push(my_card[prop[k]]);
                                    }
                                }
                                var score = Math.round(
                                    my_card[prop[i]] * factor[0] + 
                                    my_card[prop[j]] * factor[1] + 
                                    Math.max(remain[0], remain[1]) * factor[2] + 
                                    Math.min(remain[0], remain[1]) * factor[3]
                                );
                                my[key].push({
                                    card: my_card,
                                    score: score
                                });
                            }
                        }
                    }
                }

                var item = {
                    card_id: card.card_id,
                    name: card.name,
                    type: card.type,
                    category: card.category,
                    evolved: card.evolved,
                    star: card.star,
                    level: card.level,
                    gain: card.gain,
                    decisiveness: card.decisiveness,
                    creativity: card.creativity,
                    kindness: card.kindness,
                    activity: card.activity,
                    total: card.total,
                    decisiveness_rate: Math.round(card.decisiveness / card.total * 100),
                    creativity_rate: Math.round(card.creativity / card.total * 100),
                    kindness_rate: Math.round(card.kindness / card.total * 100),
                    activity_rate: Math.round(card.activity / card.total * 100)
                };

                for(key in double){
                    item[key] = double[key];
                }

                my_cards.push(item);
            }

            var sort = self.levels.sort;
            my_cards.sort(function(a, b) {
                return b[sort] - a[sort];
            });

            var double_my = [];
            for(key in my){
                my[key].sort(function(a, b){
                    return b.score - a.score;
                });

                var top = my[key].slice(0, 3);
                var my_top = [];
                var total = 0;
                for(var i = 0; i < top.length; i++){
                    var card = top[i].card;
                    my_top.push({
                        card_id: card.card_id,
                        name: card.name,
                        type: card.type,
                        category: card.category,
                        evolved: card.evolved,
                        star: card.star,
                        level: card.level,
                        gain: card.gain,
                        decisiveness: card.decisiveness,
                        creativity: card.creativity,
                        kindness: card.kindness,
                        activity: card.activity,
                        total: card.total,
                        score: top[i].score
                    });
                    total += top[i].score;
                }
                double_my.push({
                    key: key,
                    total: total,
                    top: my_top
                });
            }

            self.double.cards = my_cards;
            self.double.my = double_my;
        },
        //票房
        add_to_table: function(){
            var prop = this.prop;
            for(var i = 0; i < prop.length; i++){
                this.tickets.match_company[prop[i]] = this.reverse.scores[prop[i]];
            }
            this.reset_reverse();
            $('#reverse').modal('hide');
        },
        reset_reverse: function(){
            var prop = this.prop;
            for(var i = 0; i < prop.length; i++){
                this.reverse.separate[prop[i]] = '';
                this.reverse.addup[prop[i]] = '';
                this.reverse.scores[prop[i]] = '';
            }
        },
        has_reverse_scores: function(){
            var ret = true;
            var prop = this.prop;
            for(var i = 0; i < prop.length; i++){
                if(!this.reverse.scores[prop[i]]){
                    ret = false;
                    break;
                }
            }
            return ret;
        },
        update_reverse_scores: function(){
            var prop = this.prop;
            var option = this.reverse.option;
            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);
            var sum = 0;
            for(var i = 0; i < prop.length; i++){
                if(this.reverse[option][prop[i]]){
                    var total = this.reverse[option][prop[i]];
                    if(option == 'addup'){
                        var t = total;
                        total = total - sum;
                        sum = t;

                        this.reverse['separate'][prop[i]] = total;
                    } else if (option == 'separate'){
                        sum += t;

                        this.reverse['addup'][prop[i]] = sum;
                    }

                    var score = this.get_ticket_reverse_prop_score(prop[i], 'match');
                    var attr = (total - score) / factor[prop[i]];

                    this.reverse.scores[prop[i]] = Math.round(attr);
                }
            }
        },
        show_reverse: function(){
            if(this.get_ticket_empty('match') >= 0){
                this.show_msg('请先设置对手阵容');
                return false;
            }

            $('#reverse').modal();
        },
        get_ticket_reverse_prop_score: function(attr, option){
            var prop = this.get_ticket_reverse_prop(attr, option);
            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);
            return Math.round(factor[attr] * prop);
        },
        get_ticket_reverse_prop: function(attr, option){
            var ret = 0;
            for(var i = 0; i < this.tickets[option].length; i++){
                var card = this.tickets[option][i];
                if(!this.empty(card)){
                    ret += card[attr];
                }
            }
            // ret += this.tickets[option + '_company'][attr];
            return ret;
        },
        get_ticket_prop_score: function(attr, option){
            var prop = this.get_ticket_prop(attr, option);
            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);
            return Math.round(factor[attr] * prop);
        },
        get_ticket_prop_score_diff: function(attr, option1, option2){
            return this.get_ticket_prop_score(attr, option1) - this.get_ticket_prop_score(attr, option2);
        },
        get_ticket_character_score: function(option){
            var score = 0;
            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);
            var weight = this.get_ticket_weight(this.tickets.ticket.star) - 1;
            var prop = this.prop;
            for(var i = 0; i < this.tickets[option].length; i++){
                var card = this.tickets[option][i];
                if(this.card_id == 0){
                    continue;
                }

                if(card.category != this.tickets.ticket.category){
                    continue;
                }
                for (var j = 0; j < prop.length; j++) {
                    score += card[prop[j]] * factor[prop[j]] * weight;
                }
            }
            return Math.round(score);
        },
        get_ticket_character_score_diff: function(option1, option2){
            return this.get_ticket_character_score(option1) - this.get_ticket_character_score(option2);
        },
        get_ticket_total_score: function(option){
            var score = 0;
            score += this.get_ticket_company_score(option);
            for(var i = 0; i < this.tickets[option].length; i++){
                score += this.tickets[option][i].score || 0;
            }
            return score;
        },
        get_ticket_total_score_diff: function(option1, option2){
            return this.get_ticket_total_score(option1) - this.get_ticket_total_score(option2);
        },
        get_select_company_score: function() {
            var prop = this.prop;
            var score = 0;
            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);

            for (var i = 0; i < prop.length; i++) {
                score += factor[prop[i]] * this.tickets.company[prop[i]];
            }

            return Math.round(score);
        },
        get_ticket_company_score: function(option) {
            var prop = this.prop;
            var score = 0;
            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);

            for (var i = 0; i < prop.length; i++) {
                score += factor[prop[i]] * this.tickets[option + '_company'][prop[i]];
            }

            return Math.round(score);
        },
        get_ticket_empty: function(option) {
            var ret = -1;
            for(var i = 0; i < this.tickets[option].length; i++){
                if(this.tickets[option][i].card_id == 0){
                    ret = i;
                    break;
                }
            }
            return ret;
        },
        set_ticket_empty: function(option){
            var idx = this.get_ticket_empty(option);
            this.tickets.select.idx = idx;
            this.tickets.select.option = 'match';
            this.tickets.option = 'match';
            if(idx >= 0){
                this.show_battle(idx, option);
            }
        },
        get_ticket_prop: function(attr, option){
            var ret = 0;
            for(var i = 0; i < this.tickets[option].length; i++){
                var card = this.tickets[option][i];
                if(card.card_id != 0){
                    ret += card[attr];
                }
            }
            ret += parseInt(this.tickets[option + '_company'][attr], 10);
            return ret;
        },
        show_battle: function(idx, option) {
            this.tickets.select.idx = idx;
            this.tickets.select.option = option;
            var card = this.tickets[option][idx];
            if(card.card_id != 0){
                this.tickets.select.card_id = card.card_id;
                // this.tickets.select.type = card.type;
                // this.tickets.select.category = card.category;
                this.tickets.select.evolved = card.evolved;
                this.tickets.select.star = card.star;
                this.tickets.select.level = card.level;
                this.tickets.select.decisiveness = card.decisiveness;
                this.tickets.select.creativity = card.creativity;
                this.tickets.select.kindness = card.kindness;
                this.tickets.select.activity = card.activity;
                // this.tickets.select.name = card.name;
            
                $('#battle_typeahead').val(card.name);
            } else {
                this.tickets.select.card_id = 0;
                // this.tickets.select.evolved = 0;
                // this.tickets.select.star = 1;
                // this.tickets.select.level = 1;
                this.tickets.select.decisiveness = 0;
                this.tickets.select.creativity = 0;
                this.tickets.select.kindness = 0;
                this.tickets.select.activity = 0;
                this.tickets.select.score = 0;

                $('#battle_typeahead').val('');
            }

            $('#battle').modal();
        },
        save_battle: function() {
            var option = this.tickets.select.option;
            var card = this.tickets[option][this.tickets.select.idx];
            var select = this.tickets.select;

            card.card_id = select.card_id;
            card.evolved = select.evolved;
            card.star = select.star;
            card.level = select.level;
            card.decisiveness = select.decisiveness;
            card.creativity = select.creativity;
            card.kindness = select.kindness;
            card.activity = select.activity;
            card.name = select.name;
            card.type = select.type;
            card.category = select.category;
            card.total = select.total;
            card.score = select.score;

            $('#battle').modal('hide');
        },
        save_ticket_company: function(){
            var prop = this.prop;
            var company = this.tickets.company;
            var option = company.option;

            for (var i = 0; i < prop.length; i++) {
                this.tickets[option + '_company'][prop[i]] = company[prop[i]];
            }

            $('#ticket').modal('hide');
        },
        show_ticket_company: function(option){
            var prop = this.prop;

            for (var i = 0; i < prop.length; i++) {
                this.tickets.company[prop[i]] = this.tickets[option + '_company'][prop[i]];
            }
            this.tickets.company.option = option;

            $('#ticket').modal();
        },
        show_ticket: function(){
            if(!this.empty(this.today) && this.list.length >= 3){
                this.tickets.ticket_id = this.today.ticket_id;
                this.tickets.category = this.today.category;
                this.tickets.star = this.today.star;
                this.get_tickets();
            }
            this.nav = 'ticket';
        },
        get_tickets: function(){
            var ticket = {
                ticket_id: this.tickets.ticket_id,
                category: this.tickets.category,
                star: this.tickets.star
            };
            for (key in this.company) {
                this.tickets.my_company[key] = this.company[key];
                this.tickets.match_company[key] = this.company[key];
            }
            this.tickets.ticket = ticket;
            this.reset_config();
            this.ticket_cards();
        },
        ticket_cards: function(){
            var self = this;

            if(self.list.length < 3){
                return false;
            }

            var my_cards = [];
            var list = [];
            var factor = self.get_ticket_factor(self.tickets.ticket.ticket_id);
            var weight = self.get_ticket_weight(self.tickets.ticket.star);

            for (id in self.cards) {
                id = parseInt(id, 10);
                if (self.levels.card == 'my' && self.my_cards.indexOf(id) < 0) {
                    continue;
                }
                list.push(self.cards[id]);
            }

            for (var i = 0; i < list.length; i++) {
                var score = 0;
                var card = list[i];
                var prop = self.prop;

                var config = '';
                if (card.type == 3) {
                    config = self.levels.r;
                } else if (card.type == 4) {
                    config = self.levels.sr;
                } else if (card.type == 5) {
                    config = self.levels.ssr;
                }

                if (config == 'hidden') {
                    continue;
                } else if (config == 'ordinary') {
                    card.evolved = 0;
                    card.star = card.type;
                    card.level = (card.type - 1) * 10;
                } else if (config == 'evolved') {
                    card.evolved = 1;
                    card.star = card.type + 1;
                    card.level = card.type * 10;
                }

                if (card.type == 1 || card.type == 2) {
                    card.evolved = 0;
                    card.star = 1;
                    card.level = card.type * 5;
                }

                var data = self.predict_card(card.card_id, card.evolved, card.star, card.level);
                card.total = 0;
                for (var j = 0; j < prop.length; j++) {
                    card[prop[j]] = data[prop[j]];
                    card.total += data[prop[j]];
                }

                var idx = self.my_cards.indexOf(card.card_id);
                if (idx >= 0) {
                    var my_card = self.list[idx];
                    if (config == 'remain' || (self.levels.card == 'my' && my_card.total > card.total)) {
                        card.evolved = my_card.evolved;
                        card.star = my_card.star;
                        card.level = my_card.level;
                        card.decisiveness = my_card.decisiveness;
                        card.creativity = my_card.creativity;
                        card.kindness = my_card.kindness;
                        card.activity = my_card.activity;
                        card.total = my_card.total;
                    }
                }

                for (var j = 0; j < prop.length; j++) {
                    score += card[prop[j]] * factor[prop[j]];
                }

                if(card.category == self.tickets.ticket.category){
                    score *= weight;
                }

                my_cards.push({
                    card: card,
                    score: Math.round(score)
                });
            }
            my_cards.sort(function(a, b) {
                return b.score - a.score;
            });

            self.tickets.cards = my_cards;

            //高分羁绊
            var combine = [];
            for (var i = 0; i < 3; i++) {
                var score = my_cards[i].score;
                var my_card = my_cards[i].card;
                var card = {};
                for (key in my_card) {
                    card[key] = my_card[key];
                }
                card.score = score;
                combine.push(card);
            }
            self.tickets.my = combine;
        },
        //更新羁绊选择
        update_battle_select: function() {
            if(this.tickets.select.card_id == 0){
                return false;
            }

            var data = this.predict_card(this.tickets.select.card_id, this.tickets.select.evolved, this.tickets.select.star, this.tickets.select.level);
            var prop = this.prop;
            var total = 0;
            var score = 0;

            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);
            var weight = this.get_ticket_weight(this.tickets.ticket.star);

            for (var i = 0; i < prop.length; i++) {
                this.tickets.select[prop[i]] = data[prop[i]];
                total += data[prop[i]];
                score += data[prop[i]] * factor[prop[i]];
            }

            if(this.tickets.select.category == this.tickets.ticket.category){
                score *= weight;
            }

            this.tickets.select.total = total;
            this.tickets.select.score = Math.round(score);
        },
        show_today: function(){
            if(this.today){
                this.ticket_select.ticket_id = this.today.ticket_id;
                this.ticket_select.category = this.today.category;
                this.ticket_select.star = this.today.star;
            }
            $('#today').modal();
        },
        save_today: function(){
            var self = this;
            var data = {
                ticket_id: self.ticket_select.ticket_id,
                category: self.ticket_select.category,
                star: self.ticket_select.star
            };

            $('#save_today').button('loading');

            $.ajax({
                url: self.base_url + 'ticket',
                type: 'post',
                data: data,
                success: function(res) {
                    if (res.status == 1) {
                        self.today = data;
                        self.ticket_combine();

                        $('#today').modal('hide');
                    } else if (res.info) {
                        show_msg(res.info);
                    }
                },
                error: function(res) {
                    self.show_msg('请求失败');
                },
                complete: function() {
                    $('#save_today').button('reset');
                }
            });
        },
        ticket_combine: function(){
            if(this.list.length < 3 || this.empty(this.today)){
                return false;
            }

            var list = this.list;
            var scores = [];
            var factor = this.get_ticket_factor(this.today.ticket_id);
            var weight = this.get_ticket_weight(this.today.star);
            var prop = this.prop;
            var combine = [];

            for(var i = 0; i < list.length; i++){
                var card = list[i];
                var score = 0;

                for(var j = 0; j < prop.length; j++){
                    score += card[prop[j]] * factor[prop[j]];
                }

                if(card.category == this.today.category){
                    score *= weight;
                }

                scores.push({
                    card: card,
                    score: score
                });
            }

            scores.sort(function(a, b){
                return b.score - a.score;
            });

            for(var i = 0; i < 3; i++){
                combine.push(scores[i].card.name);
            }

            this.tickets.combine = combine;
        },
        get_ticket_weight: function(star){
            star = parseInt(star, 10);
            var ret = 1;
            switch(star){
                case 3:
                    ret = 1.1;
                    break;
                case 4:
                    ret = 1.2;
                    break;
                case 5:
                    ret = 1.3;
                    break;
            }
            return ret;
        },
        get_ticket_factor: function(ticket_id){
            var ret = {};

            for(var i = 0; i < this.ticket.length; i++){
                if(this.ticket[i].id == ticket_id){
                    ret = this.ticket[i];
                    break;
                }
            }

            return ret;
        },
        //过关羁绊
        show_combine: function(idx) {
            this.levels.select.idx = idx;
            var card = this.levels.combine[idx];
            this.levels.select.card_id = card.card_id;
            // this.levels.select.type = card.type;
            // this.levels.select.category = card.category;
            this.levels.select.evolved = card.evolved;
            this.levels.select.star = card.star;
            this.levels.select.level = card.level;
            this.levels.select.decisiveness = card.decisiveness;
            this.levels.select.creativity = card.creativity;
            this.levels.select.kindness = card.kindness;
            this.levels.select.activity = card.activity;
            // this.levels.select.name = card.name;
            $('#combine_typeahead').val(card.name);

            $('#combine').modal();
        },
        save_combine: function() {
            var card = this.levels.combine[this.levels.select.idx];
            var select = this.levels.select;

            card.card_id = select.card_id;
            card.evolved = select.evolved;
            card.star = select.star;
            card.level = select.level;
            card.decisiveness = select.decisiveness;
            card.creativity = select.creativity;
            card.kindness = select.kindness;
            card.activity = select.activity;
            card.name = select.name;
            card.type = select.type;
            card.category = select.category;
            card.total = select.total;
            card.score = select.score;

            $('#combine').modal('hide');
        },
        show_special: function() {
            $('#special').modal();
        },
        //总分
        get_total_score: function() {
            var score = 0;
            score += this.get_company_score();
            score += this.get_special_score();

            for (var i = 0; i < this.levels.combine.length; i++) {
                score += this.levels.combine[i].score;
            }

            return score;
        },
        //公司得分
        get_company_score: function() {
            var prop = this.prop;
            var score = 0;

            for (var i = 0; i < prop.length; i++) {
                score += this.levels.level[prop[i]] * this.levels.company[prop[i]] * this.levels.level['company'];
            }

            return Math.round(score);
        },
        //专家得分
        get_special_score: function() {
            var prop = this.prop;
            var score = 0;

            for (var i = 0; i < prop.length; i++) {
                score += this.levels.level[prop[i]] * this.levels.company[prop[i]] * this.levels.level['special'] * this.levels.multiple;
            }

            return Math.round(score);
        },
        //获取实力需求
        get_card_demand: function(item) {
            var prop = this.prop;
            var arr = [];
            for (var i = 0; i < prop.length; i++) {
                arr.push({
                    tag: prop[i],
                    weight: item[prop[i]]
                });
            }
            arr.sort(function(a, b) {
                return b.weight - a.weight;
            });

            return this.get_prop_tag(arr[0].tag) + ' ' + this.get_prop_tag(arr[1].tag);
        },
        //属性标签
        get_prop_tag: function(attr) {
            var ret = '';
            switch (attr) {
                case 'decisiveness':
                    ret = '决策';
                    break;
                case 'creativity':
                    ret = '创造';
                    break;
                case 'kindness':
                    ret = '亲和';
                    break;
                case 'activity':
                    ret = '行动';
                    break;
            }
            return ret;
        },
        //关卡计算
        get_levels: function() {
            var self = this;
            self.levels.overflow = false;
            self.levels.multiple = 2;
            self.levels.level = {};
            self.levels.cards = [];

            if (self.level != 0) {
                $level_id = self.select[self.category][self.chapter][self.level];
                return self.get_level($level_id);
            }

            $('#get_levels').button('loading');
            $.ajax({
                url: self.base_url + 'levels',
                type: 'post',
                data: {
                    category: self.category,
                    chapter: self.chapter
                },
                success: function(res) {
                    if (res.status == 1) {
                        var list = res.list;

                        for (var i = 0; i < list.length; i++) {
                            var item = list[i];
                            var my_cards = [];
                            for (var j = 0; j < self.list.length; j++) {
                                var score = 0;
                                var card = self.list[j];

                                if ((item.category == 3 && [2, 5].indexOf(card.category) < 0) ||
                                    (item.category == 4 && [4, 5].indexOf(card.category) < 0) ||
                                    (item.category == 5 && [1, 5].indexOf(card.category) < 0) ||
                                    (item.category == 6 && [3, 5].indexOf(card.category) < 0)) {
                                    continue;
                                }

                                var prop = self.prop;

                                for (var k = 0; k < prop.length; k++) {
                                    score += card[prop[k]] * item[prop[k]];
                                }

                                card.score = score;
                                my_cards.push(card);
                            }
                            my_cards.sort(function(a, b) {
                                return b.score - a.score;
                            });

                            //羁绊得分
                            item.combine = [];
                            var total = 0;
                            for (var j = 0; j < 3; j++) {
                                item.combine.push(my_cards[j].name);
                                total += my_cards[j].score;
                            }

                            var prop = self.prop;
                            for (var k = 0; k < prop.length; k++) {
                                //公司得分
                                total += self.company[prop[k]] * item[prop[k]] * item['company'];
                                //专家得分
                                total += self.company[prop[k]] * item[prop[k]] * item['special'] * self.levels.multiple;
                            }

                            item.score = Math.round(total);
                            item.half_score = Math.round((item.pass_score + item.full_score) / 2);
                            list[i] = item;
                        }

                        self.levels.list = list;
                    } else if (res.info) {
                        show_msg(res.info);
                    }
                },
                error: function(res) {
                    self.show_msg('请求失败');
                },
                complete: function() {
                    $('#get_levels').button('reset');
                }
            });
        },
        //单关计算
        get_level: function(id) {
            var self = this;
            self.levels.list = [];
            for (key in self.company) {
                self.levels.company[key] = self.company[key];
            }
            self.reset_config();

            $('#get_levels').button('loading');
            $.ajax({
                url: self.base_url + 'level',
                type: 'post',
                data: {
                    id: id
                },
                success: function(res) {
                    if (res.status == 1) {
                        var level = res.level;
                        var count = 0;
                        var loop = [];
                        for (var i = 1; i <= 3; i++) {
                            if (level['request' + i]) {
                                loop.push(i);
                                count++;
                            }
                        }
                        level.count = count;
                        level.loop = loop;
                        level.half_score = Math.round((level.pass_score + level.full_score) / 2);
                        self.level = level.level;
                        self.levels.level = level;

                        self.level_cards();
                    } else if (res.info) {
                        show_msg(res.info);
                    }
                },
                error: function(res) {
                    self.show_msg('请求失败');
                },
                complete: function() {
                    $('#get_levels').button('reset');
                }
            });
        },
        reset_config: function(){
            this.levels.config = false;
            this.levels.card = 'my';
            this.levels.r = 'remain';
            this.levels.sr = 'remain';
            this.levels.ssr = 'remain';
        },
        //关卡羁绊得分计算
        level_cards: function() {
            var self = this;

            if(self.list.length < 3){
                return false;
            }

            var my_cards = [];
            var list = [];

            for (id in self.cards) {
                id = parseInt(id, 10);
                if (self.levels.card == 'my' && self.my_cards.indexOf(id) < 0) {
                    continue;
                }
                list.push(self.cards[id]);
            }

            for (var i = 0; i < list.length; i++) {
                var score = 0;
                var card = list[i];
                var prop = self.prop;

                if ((self.levels.level.category == 3 && [2, 5].indexOf(card.category) < 0) ||
                    (self.levels.level.category == 4 && [4, 5].indexOf(card.category) < 0) ||
                    (self.levels.level.category == 5 && [1, 5].indexOf(card.category) < 0) ||
                    (self.levels.level.category == 6 && [3, 5].indexOf(card.category) < 0)) {
                    continue;
                }

                var config = '';
                if (card.type == 3) {
                    config = self.levels.r;
                } else if (card.type == 4) {
                    config = self.levels.sr;
                } else if (card.type == 5) {
                    config = self.levels.ssr;
                }

                if (config == 'hidden') {
                    continue;
                } else if (config == 'ordinary') {
                    card.evolved = 0;
                    card.star = card.type;
                    card.level = (card.type - 1) * 10;
                } else if (config == 'evolved') {
                    card.evolved = 1;
                    card.star = card.type + 1;
                    card.level = card.type * 10;
                }

                if (card.type == 1 || card.type == 2) {
                    card.evolved = 0;
                    card.star = 1;
                    card.level = card.type * 5;
                }

                var data = self.predict_card(card.card_id, card.evolved, card.star, card.level);
                card.total = 0;
                for (var j = 0; j < prop.length; j++) {
                    card[prop[j]] = data[prop[j]];
                    card.total += data[prop[j]];
                }

                var idx = self.my_cards.indexOf(card.card_id);
                if (idx >= 0) {
                    var my_card = self.list[idx];
                    if (config == 'remain' || (self.levels.card == 'my' && my_card.total > card.total)) {
                        card.evolved = my_card.evolved;
                        card.star = my_card.star;
                        card.level = my_card.level;
                        card.decisiveness = my_card.decisiveness;
                        card.creativity = my_card.creativity;
                        card.kindness = my_card.kindness;
                        card.activity = my_card.activity;
                        card.total = my_card.total;
                    }
                }

                for (var j = 0; j < prop.length; j++) {
                    score += card[prop[j]] * self.levels.level[prop[j]];
                }

                my_cards.push({
                    card: card,
                    score: Math.round(score)
                });
            }
            my_cards.sort(function(a, b) {
                return b.score - a.score;
            });

            self.levels.cards = my_cards;

            //高分羁绊
            var combine = [];
            for (var i = 0; i < 3; i++) {
                var score = my_cards[i].score;
                var my_card = my_cards[i].card;
                var card = {};
                for (key in my_card) {
                    card[key] = my_card[key];
                }
                card.score = score;
                combine.push(card);
            }
            self.levels.combine = combine;
        },
        //导出数据
        export_data: function() {
            var list = this.list;
            var data = [];

            if (this.batch.source == 'calculator') {
                for (var i = 0; i < list.length; i++) {
                    var arr = list[i].name.split('·');
                    data.push({
                        name: arr[1],
                        rarity: this.get_type_tag(list[i].type),
                        character: this.get_character_tag(list[i].category),
                        decision: list[i].decisiveness,
                        creativity: list[i].creativity,
                        appetency: list[i].kindness,
                        action: list[i].activity,
                        way: this.get_gain_tag(list[i].gain),
                        id: list[i].card_id
                    });
                }
                this.batch.export = JSON.stringify({
                    'user-defined': data,
                    'pre-defined': [],
                    'company': this.company
                });
            } else if (this.batch.source == 'excel') {
                data.push(['公司属性', this.company.decisiveness, this.company.creativity, this.company.kindness, this.company.activity].join("\t"));
                for (var i = 0; i < list.length; i++) {
                    var arr = list[i].name.split('·');
                    data.push([arr[1], list[i].decisiveness, list[i].creativity, list[i].kindness, list[i].activity].join("\t"));
                }
                this.batch.export = data.join("\n");
            }
        },
        //导入数据
        import_data: function() {
            var self = this;
            var data = self.batch.data;
            var list = [];
            if (self.batch.source == 'calculator') {
                //测试数据：
                //{"user-defined":[{"name":"新年大吉","rarity":"R","character":"周棋洛","decision":0,"creativity":0,"appetency":0,"action":0,"way":"自定义","id":1519353885350},{"name":"星空之吻","rarity":"SR","character":"白起","decision":55,"creativity":2554,"appetency":1132,"action":2830,"way":"自定义","id":1519353993354},{"name":"你的模样","rarity":"R","character":"周棋洛","decision":39,"creativity":1314,"appetency":1597,"action":1211,"way":"自定义","id":1519354093529}],"pre-defined":["交缠视线","记忆裂痕"]}
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    self.show_msg('数据格式错误');
                    return false;
                }

                if(data.company){
                    list.push({
                        name: '公司属性',
                        decisiveness: data.company.decisiveness,
                        decisiveness: data.company.creativity,
                        decisiveness: data.company.kindness,
                        decisiveness: data.company.activity
                    });

                    self.company = data.company;
                }

                if (!self.empty(data['pre-defined'])) {
                    for (var i = 0; i < data['pre-defined'].length; i++) {
                        list.push({
                            name: data['pre-defined'][i],
                            decisiveness: 0,
                            creativity: 0,
                            kindness: 0,
                            activity: 0
                        });
                    }
                }
                if (!self.empty(data['user-defined'])) {
                    for (var i = 0; i < data['user-defined'].length; i++) {
                        list.push({
                            name: data['user-defined'][i].name,
                            decisiveness: data['user-defined'][i].decision,
                            creativity: data['user-defined'][i].creativity,
                            kindness: data['user-defined'][i].appetency,
                            activity: data['user-defined'][i].action
                        });
                    }
                }
            } else if (self.batch.source == 'excel') {
                //测试数据：
                // 星空之吻    55  2554    1132    2830
                // 点点萤光    905 30  1175    1052
                // 心灵博弈    1618    1785    39  719
                // 你的样子    39  1314    1597    1211
                data = data.split("\n");
                for (var i = 0; i < data.length; i++) {
                    var arr = data[i].split("\t");
                    if (self.empty(arr) || arr.length < 5) {
                        continue;
                    }
                    if(arr[0] == '公司属性'){
                        self.company.decisiveness = arr[1];
                        self.company.creativity = arr[2];
                        self.company.kindness = arr[3];
                        self.company.activity = arr[4];
                    }
                    list.push({
                        name: arr[0],
                        decisiveness: arr[1],
                        creativity: arr[2],
                        kindness: arr[3],
                        activity: arr[4]
                    });
                }
            }

            if (self.empty(list)) {
                self.show_msg('数据格式错误');
                return false;
            }

            $('#import_data').button('loading');

            $.ajax({
                url: self.base_url + 'import_data',
                type: 'post',
                data: {
                    token: self.get_token(),
                    list: JSON.stringify(list)
                },
                success: function(res) {
                    if (res.status == 1) {
                        self.batch.data = '';
                        self.batch.fail = res.fail;
                        self.merge(res.success);
                        self.load();
                        $('#batch').modal('hide');
                    } else if (res.info) {
                        show_msg(res.info);
                    }
                },
                error: function(res) {
                    self.show_msg('请求失败');
                },
                complete: function() {
                    $('#import_data').button('reset');
                }
            });
        },
        //导入数据合并
        merge: function(data){
            var ids = this.my_cards;
            var list = this.list;
            for(var i = 0; i < data.length; i++){
                var card = data[i];
                if(ids.indexOf(card.card_id) < 0){
                    list.push(card);
                } else {
                    list[ids.indexOf(card.card_id)] = card;
                }
            }
            list.sort(function(a,b){
                return b.total - a.total;
            });
            var my_cards = [];
            for(var i = 0; i < list.length; i++){
                my_cards.push(list[i].card_id);
            }

            this.list = list;
            this.my_cards = my_cards;
        },
        //批量导入
        show_batch: function(option) {
            this.batch.option = option;
            this.batch.export = '';
            $('#batch').modal();
        },
        //筛选
        use_filter: function(filter, item) {
            var ret = true;
            for (f in filter) {
                if (!this.empty(filter[f]) && (typeof(item[f]) == 'string' ? item[f].indexOf(filter[f]) < 0 : item[f] != filter[f])) {
                    ret = false;
                    break;
                }
            }
            return ret;
        },
        //保存羁绊
        save_card: function() {
            var self = this;
            $('#save_card').button('loading');

            var user_correct = 0;
            var data = self.predict_card(self.card_select.card_id, self.card_select.evolved, self.card_select.star, self.card_select.level);
            var prop = self.prop;
            for (var i = 0; i < prop.length; i++) {
                if (data[prop[i]] != self.card_select[prop[i]]) {
                    user_correct = 1;
                }
            }

            $.ajax({
                url: self.base_url + 'save_card',
                type: 'post',
                data: {
                    token: self.get_token(),
                    card_id: self.card_select.card_id,
                    evolved: self.card_select.evolved,
                    star: self.card_select.star,
                    level: self.card_select.level,
                    decisiveness: self.card_select.decisiveness,
                    creativity: self.card_select.creativity,
                    kindness: self.card_select.kindness,
                    activity: self.card_select.activity,
                    user_correct: user_correct
                },
                success: function(res) {
                    if (res.status == 1) {
                        var card = res.card;
                        var card_id = card.card_id;
                        if (card.predict) {
                            self.cards[card_id].predict = card.predict;
                            delete card.predict;
                        }
                        if (card.correction) {
                            self.cards[card_id].correction = card.correction;
                            delete card.correction;
                        }

                        var idx = self.my_cards.indexOf(card_id);
                        if (idx >= 0) {
                            self.list[idx] = card;
                        } else {
                            self.list.push(card);
                        }
                        self.list.sort(function(a, b) {
                            return b.total - a.total;
                        });

                        var my_cards = [];
                        for (var i = 0; i < self.list.length; i++) {
                            my_cards.push(self.list[i].card_id);
                        }
                        self.my_cards = my_cards;

                        $('#card').modal('hide');
                    } else if (res.info) {
                        show_msg(res.info);
                    }
                },
                error: function(res) {
                    self.show_msg('请求失败');
                },
                complete: function() {
                    $('#save_card').button('reset');
                }
            });
        },
        remove_all: function() {
            var ack = confirm('确定清空吗？');
            if (ack) {
                var self = this;
                $.ajax({
                    url: self.base_url + 'remove_all',
                    type: 'post',
                    data: {
                        token: self.get_token()
                    },
                    success: function(res) {
                        if (res.status == 1) {
                            self.company = {};
                            self.list = [];
                            self.my_cards = [];
                            self.levels.list = [];
                            self.levels.level = {};
                            self.levels.cards = [];
                        } else if (res.info) {
                            show_msg(res.info);
                        }
                    },
                    error: function(res) {
                        self.show_msg('请求失败');
                    }
                });
            }
        },
        remove_card: function(id) {
            var ack = confirm('确定删除吗？');
            if (ack) {
                var self = this;
                $.ajax({
                    url: self.base_url + 'remove_card',
                    type: 'post',
                    data: {
                        token: self.get_token(),
                        card_id: id
                    },
                    success: function(res) {
                        if (res.status == 1) {
                            var idx = self.my_cards.indexOf(id);
                            self.my_cards.splice(idx, 1);
                            self.list.splice(idx, 1);
                        } else if (res.info) {
                            show_msg(res.info);
                        }
                    },
                    error: function(res) {
                        self.show_msg('请求失败');
                    }
                });
            }
        },
        //显示羁绊选择
        show_card: function(id) {
            if (id) {
                this.card_select.card_id = id;
            }
            $('#card').modal();
        },
        //更新羁绊选择
        update_combine_select: function() {
            var data = this.predict_card(this.levels.select.card_id, this.levels.select.evolved, this.levels.select.star, this.levels.select.level);
            var prop = this.prop;
            var total = 0;
            var score = 0;

            for (var i = 0; i < prop.length; i++) {
                this.levels.select[prop[i]] = data[prop[i]];
                total += data[prop[i]];
                score += data[prop[i]] * this.levels.level[prop[i]];
            }

            this.levels.select.total = total;
            this.levels.select.score = Math.round(score);
        },
        //更新羁绊选择
        update_card_select: function() {
            var data = this.predict_card(this.card_select.card_id, this.card_select.evolved, this.card_select.star, this.card_select.level);
            var prop = this.prop;

            for (var i = 0; i < prop.length; i++) {
                this.card_select[prop[i]] = data[prop[i]];
            }
        },
        //羁绊数据预测
        predict_card: function(card_id, evolved, star, level) {
            var card = this.cards[card_id];
            var key = evolved + ':' + star + ':' + level;
            if (card.correction[key]) {
                return card.correction[key];
            }

            var prop = this.prop
            var data = {};
            var weight = evolved == 0 ? 1 : 1.45;
            for (var i = 0; i < prop.length; i++) {
                data[prop[i]] = Math.round(weight * (level * (star * card.predict[prop[i]][0] + card.predict[prop[i]][1]) + card.predict[prop[i]][2]));
            }

            return data;
        },
        //更新公司数据
        update_company: function() {
            var self = this;
            $('#update_company').button('loading');

            $.ajax({
                url: self.base_url + 'update_company',
                type: 'post',
                data: {
                    token: self.get_token(),
                    decisiveness: self.company.decisiveness,
                    creativity: self.company.creativity,
                    kindness: self.company.kindness,
                    activity: self.company.activity
                },
                success: function(res) {
                    if (res.info) {
                        show_msg(res.info);
                    }
                },
                error: function(res) {
                    self.show_msg('请求失败');
                },
                complete: function() {
                    $('#update_company').button('reset');
                }
            });
        },
        //显示登录
        show_login: function(option) {
            this.login.option = option;
            $('#company').modal();
        },
        //登录
        user_login: function() {
            var self = this;
            $('#user_login').button('loading');

            if (self.login.name == '') {
                self.login.warning = '请填写公司名称';
                return false;
            }

            $.ajax({
                url: self.base_url + self.login.option,
                type: 'post',
                data: {
                    name: self.login.name,
                    code: self.login.code,
                    list: self.get_json_list(),
                },
                success: function(res) {
                    if (res.status == 1) {
                        //保存历史记录
                        var history = $.LS.get('history') || {};
                        if (typeof(history) == 'string') {
                            history = JSON.parse(history);
                        }
                        history[self.login.name] = self.login.code;
                        $.LS.set('history', JSON.stringify(history));
                        self.login.history = history;

                        //登录用户
                        self.user.name = self.login.name;
                        self.user.code = self.login.code;

                        //本地存储
                        $.LS.set('name', self.login.name);
                        $.LS.set('code', self.login.code);

                        self.login.name = '';
                        self.login.code = '';

                        self.load();

                        $('#company').modal('hide');
                    } else if (res.info) {
                        self.login.warning = res.info;
                    }
                },
                error: function(res) {
                    self.show_msg('请求失败');
                },
                complete: function() {
                    $('#user_login').button('reset');
                }
            });
        },
        //羁绊导入JSON
        get_json_list: function(){
            var list = this.list;
            if(this.empty(list)){
                return '';
            }

            var json = [];
            json.push({
                name: '公司属性',
                decisiveness: this.company.decisiveness,
                creativity: this.company.creativity,
                kindness: this.company.kindness,
                activity: this.company.activity
            });
            for(var i = 0; i < list.length; i++){
                json.push({
                    name: list[i].name,
                    decisiveness: list[i].decisiveness,
                    creativity: list[i].creativity,
                    kindness: list[i].kindness,
                    activity: list[i].activity
                });
            }

            return JSON.stringify(json);
        },
        //注销
        logout: function() {
            //历史记录
            $.LS.set('history', JSON.stringify({}));
            this.login.history = {};

            //登录用户
            this.user.name = '';
            this.user.code = '';

            //本地存储
            $.LS.set('name', '');
            $.LS.set('code', '');
        },
        //显示提示信息
        show_msg: function(msg) {
            alert(msg);
        },
        //获取标签
        get_gain_tag: function(gain) {
            if (gain.indexOf('限定') >= 0) {
                return '限定';
            } else if (gain.indexOf('副本') >= 0) {
                return '副本';
            } else if (gain.indexOf('充值') >= 0) {
                return '充值';
            } else if (gain.indexOf('奖励') >= 0) {
                return '奖励';
            } else if (gain.indexOf('许愿') >= 0) {
                return '许愿';
            } else if (gain.indexOf('登录') >= 0) {
                return '登录';
            } else {
                return gain;
            }
        },
        //人物标签
        get_character_tag: function(category) {
            category = parseInt(category, 10);
            var ret = '';
            switch (category) {
                case 1:
                    ret = '李泽言';
                    break;
                case 2:
                    ret = '许墨';
                    break;
                case 3:
                    ret = '周棋洛';
                    break;
                case 4:
                    ret = '白起';
                    break;
                case 5:
                    ret = '其他';
                    break;
            }
            return ret;
        },
        //星级标签
        get_rank_tag: function(item, score) {
            var rank = 0;
            if (score > item.full_score) {
                rank = 3;
            } else if (score > item.half_score) {
                rank = 2;
            } else if (score > item.pass_score) {
                rank = 1;
            }
            if (item.pass_score == 0) {
                rank = -1;
            }

            var ret = '';
            if (rank == -1) {
                ret = '无数据';
            } else {
                ret = rank + '星';
            }
            return ret;
        },
        //类别标签
        get_category_tag: function(category) {
            category = parseInt(category, 10);
            var ret = '';
            switch (category) {
                case 1:
                    ret = '普通';
                    break;
                case 2:
                    ret = '精英';
                    break;
                case 3:
                    ret = '副本-许墨';
                    break;
                case 4:
                    ret = '副本-白起';
                    break;
                case 5:
                    ret = '副本-李泽言';
                    break;
                case 6:
                    ret = '副本-周棋洛';
                    break;
            }
            return ret;
        },
        //票房主题
        get_ticket_name: function(ticket_id){
            var ret = '';
            for(var i = 0; i < this.ticket.length; i++){
                if(this.ticket[i].id == ticket_id){
                    ret = this.ticket[i].name;
                    break;
                }
            }
            return ret;
        },
        //星级
        get_star_print: function(star) {
            var ret = '';
            for (var i = 0; i < star; i++) {
                ret += '☆';
            }
            return ret;
        },
        //进化标签
        get_evolved_tag: function(evolved) {
            var ret = evolved == 1 ? '进化' : '未进化';
            return ret;
        },
        //类型标签
        get_type_tag: function(type) {
            var ret = '';
            switch (type) {
                case 1:
                    ret = 'N';
                    break;
                case 2:
                    ret = 'NH';
                    break;
                case 3:
                    ret = 'R';
                    break;
                case 4:
                    ret = 'SR';
                    break;
                case 5:
                    ret = 'SSR';
                    break;
            }
            return ret;
        },
        //获取接口请求token
        get_token: function() {
            return this.empty(this.user.name) ? '' : btoa(encodeURIComponent(JSON.stringify(this.user)));
        },
        //判断数据或对象为空（增加判断0或''）
        empty: function(value) {
            return (Array.isArray(value) && value.length === 0) ||
                (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0) || !value;
        },
        load: function() {
            var self = this;

            $.ajax({
                url: self.base_url + 'init',
                type: 'post',
                data: {
                    token: self.get_token()
                },
                success: function(res) {
                    if (res.status == 1) {
                        self.select = res.select;
                        self.cards = res.cards;

                        self.card_list = [];
                        for (id in self.cards) {
                            var card = self.cards[id];
                            self.card_list.push(card.name);
                        }

                        if (res.company) {
                            self.company = res.company;
                        }

                        if (res.list) {
                            self.list = res.list;
                            self.my_cards = [];

                            for (var i = 0; i < self.list.length; i++) {
                                self.my_cards.push(self.list[i].card_id);
                            }
                        }

                        if (res.ticket) {
                            self.ticket = res.ticket;
                        }

                        if (!self.empty(res.today) && self.empty(self.today)){
                            self.today = res.today;
                            self.ticket_combine();
                        }

                        if (!self.dom_init) {
                            $('.typeahead').typeahead({
                                source: self.card_list
                            });

                            $('.typeahead').click(function() {
                                $(this).typeahead('lookup');
                            });

                            $('#card_typeahead').change(function() {
                                var name = $(this).val();

                                if (self.card_list.indexOf(name) >= 0) {
                                    self.card_select.name = name;
                                    $(this).val('');
                                    self.show_card();
                                }
                            });

                            $('#combine_typeahead').change(function() {
                                var name = $(this).val();

                                if (self.card_list.indexOf(name) >= 0) {
                                    for (id in self.cards) {
                                        if (self.cards[id].name == name) {
                                            self.levels.select.card_id = id;
                                            self.levels.select.category = self.cards[id].category;
                                            self.levels.select.type = self.cards[id].type;
                                            self.levels.select.name = self.cards[id].name;
                                            break;
                                        }
                                    }
                                    self.update_combine_select();
                                }
                            });

                            $('#battle_typeahead').change(function() {
                                var name = $(this).val();

                                if (self.card_list.indexOf(name) >= 0) {
                                    for (id in self.cards) {
                                        if (self.cards[id].name == name) {
                                            self.tickets.select.card_id = id;
                                            self.tickets.select.category = self.cards[id].category;
                                            self.tickets.select.type = self.cards[id].type;
                                            self.tickets.select.name = self.cards[id].name;
                                            break;
                                        }
                                    }
                                    self.update_battle_select();
                                }
                            });

                            $('#navbar-menu ul li a').click(function() {
                                $('#navbar-menu').collapse('hide');
                            });

                            self.dom_init = true;
                        }

                        if(self.empty(self.list)){
                            self.nav = 'card';
                        }
                    } else if (res.info) {
                        self.show_msg(res.info);
                    }
                },
                error: function(res) {
                    self.show_msg('请求失败');
                }
            });

            var history = $.LS.get('history') || {};
            if (typeof(history) == 'string') {
                self.login.history = JSON.parse(history);
            }
        }
    },
    mounted: function() {
        this.load();
    }
});