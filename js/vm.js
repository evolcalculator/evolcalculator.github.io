var vm = new Vue({
    el: "#app",
    data: {
        version: '2.3.41',
        path: $.LS.get('path') || 'img/',
        show_path: false,
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
        all_cards: [], //全部羁绊列表
        list_filtered: [], //过滤后
        all_cards_filtered: [], //过滤后
        card_limit: 5, //我的羁绊显示数量
        all_card_limit: 5, //全部羁绊显示数量
        company: $.LS.get('company') ? JSON.parse($.LS.get('company')) : { //我的公司
            decisiveness: 0,
            creativity: 0,
            kindness: 0,
            activity: 0
        },
        list: [], // 我的羁绊
        my_cards: [], //我的羁绊ID
        login: { // 登录信息
            name: '',
            code: '',
            warning: '',
            history: {},
            option: 'create_user',
            eye: false
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
            category: '0',
            type: '0',
            name: ''
        },
        card_expand: false,
        all_card_filter: {
            category: '0',
            type: '0',
            name: ''
        },
        all_card_expand: false,
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
            multiple: $.LS.get('multiple') || 2,
            cards: [],
            combine: [],
            card: 'my',
            r: 'remain',
            sr: 'remain',
            ssr: 'remain',
            config: false,
            // cols: ['decisiveness','creativity','kindness','activity','gain'],
            cols: ['value', 'gain'],
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
                activity: 0,
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
            match: [{
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
                activity: 0,
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
        //卡组分析
        double: {
            cards: [],
            option: 'all',
            my: [],
            sort: -1
        },
        //24小时挑战
        challenge: [],
        challenges: {
            mode: '0',
            expand: false,
            threshold: $.LS.get('challenges.threshold') || 2000,
            select_threshold: $.LS.get('challenges.threshold') || 2000,
            sort: 'score',
            desc: 1,
            my_bonus: $.LS.get('challenges.my_bonus') || 0,
            match_bonus: $.LS.get('challenges.match_bonus') || 0,
            combine: [],
            challenge: {},
            record: $.LS.get('challenges.record') ? JSON.parse($.LS.get('challenges.record')) : [],
            recommend_text: '',
            field_option: 0,
            my_damaged: [],
            match_damaged: [],
            ready: false,
            calc: [{
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
            my: [{
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
            match: [{
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
                option: '',
                total: 0
            },
            select: {
                card_id: 0,
                evolved: 0,
                star: 1,
                level: 1,
                decisiveness: 0,
                creativity: 0,
                kindness: 0,
                activity: 0,
                idx: 0,
                score: 0,
                total: 0,
                category: 0,
                type: 0,
                name: '',
                option: '',
                role: 1,
                rare: 5,
                color: 1,
                show_head: false,
                check_head: false,
                lock: {}
            },
            cards: $.LS.get('challenges.cards') ? JSON.parse($.LS.get('challenges.cards')) : [],
            field_ids: [],
            recommend_choice: [],
            my_ids: [],
            cards_ids: [],
            field_list: [],
            history: $.LS.get('challenges.history') ? JSON.parse($.LS.get('challenges.history')) : [],
            config: ['hide_weak']
        },
        challenge_select: {
            library: 1,
            level: 1,
            next_level: 2
        }
        // lab: $.LS.get('lab') ? JSON.parse($.LS.get('lab')) : {}
    },
    watch: {
        //数据本地存储
        'challenges.threshold': function(newVal, oldVal){
            $.LS.set('challenges.threshold', newVal);
        },
        'challenges.my_bonus': function(newVal, oldVal){
            $.LS.set('challenges.my_bonus', newVal);
        },
        'challenges.match_bonus': function(newVal, oldVal){
            $.LS.set('challenges.match_bonus', newVal);
        },
        'path': function(newVal, oldVal){
            $.LS.set('path', newVal);
        },
        'challenges.cards': function(newVal, oldVal) {
            $.LS.set('challenges.cards', JSON.stringify(newVal));
        },
        'challenges.record': function(newVal, oldVal) {
            $.LS.set('challenges.record', JSON.stringify(newVal));
        },
        'challenges.history': function(newVal, oldVal) {
            $.LS.set('challenges.history', JSON.stringify(newVal));
        },
        'levels.multiple': function(newVal, oldVal) {
            $.LS.set('multiple', newVal);
        },
        list: function(newVal, oldVal) {
            $.LS.set('list', JSON.stringify(newVal));

            this.ticket_combine();
            this.update_list_filtered();
        },
        all_cards: function(newVal, oldVal) {
            this.update_all_cards_filtered();
        },
        my_cards: function(newVal, oldVal) {
            $.LS.set('my_cards', JSON.stringify(newVal));
        },
        'company.decisiveness': function(newVal, oldVal) {
            var max = 5000;
            var val = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            if (val && val > max) {
                val = max;
            }
            this.company.decisiveness = val;

            $.LS.set('company', JSON.stringify(this.company));
        },
        'company.creativity': function(newVal, oldVal) {
            var max = 5000;
            var val = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            if (val && val > max) {
                val = max;
            }
            this.company.creativity = val;
            $.LS.set('company', JSON.stringify(this.company));
        },
        'company.kindness': function(newVal, oldVal) {
            var max = 5000;
            var val = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            if (val && val > max) {
                val = max;
            }
            this.company.kindness = val;
            $.LS.set('company', JSON.stringify(this.company));
        },
        'company.activity': function(newVal, oldVal) {
            var max = 5000;
            var val = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            if (val && val > max) {
                val = max;
            }
            this.company.activity = val;
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
        //羁绊筛选
        'card_filter.name': function(newVal, oldVal) {
            this.update_list_filtered();
        },
        'card_filter.category': function(newVal, oldVal) {
            this.update_list_filtered();
        },
        'card_filter.type': function(newVal, oldVal) {
            this.update_list_filtered();
        },
        'all_card_filter.name': function(newVal, oldVal) {
            this.update_all_cards_filtered();
        },
        'all_card_filter.category': function(newVal, oldVal) {
            this.update_all_cards_filtered();
        },
        'all_card_filter.type': function(newVal, oldVal) {
            this.update_all_cards_filtered();
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

            this.card_select.evolved = this.card_select.type < 3 ? 0 : this.card_select.evolved;
            var max_star = this.card_select.evolved == 0 ? this.card_select.type : this.card_select.type + 1;
            var max_level = this.card_select.evolved == 0 ? (this.card_select.type - 1) * 10 : this.card_select.type * 10;
            if (this.card_select.type < 3) {
                max_star = 1;
                max_level = this.card_select.type == 2 ? 10 : 5;
            } else {
                max_star += 1;
                max_level += 10;
            }

            if (this.card_select.star > max_star) {
                this.card_select.star = max_star;
            }
            if (this.card_select.level > max_level) {
                this.card_select.level = max_level;
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
            if (card) {
                this.levels.select.name = card.name;
                this.levels.select.type = card.type;
                this.levels.select.category = card.category;

                this.levels.select.evolved = this.levels.select.type < 3 ? 0 : this.levels.select.evolved;
                var max_star = this.levels.select.evolved == 0 ? this.levels.select.type : this.levels.select.type + 1;
                var max_level = this.levels.select.evolved == 0 ? (this.levels.select.type - 1) * 10 : this.levels.select.type * 10;
                if (this.levels.select.type < 3) {
                    max_star = 1;
                    max_level = this.levels.select.type == 2 ? 10 : 5;
                } else {
                    max_star += 1;
                    max_level += 10;
                }

                if (this.levels.select.star > max_star) {
                    this.levels.select.star = max_star;
                }
                if (this.levels.select.level > max_level) {
                    this.levels.select.level = max_level;
                }
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
            if (card) {
                this.tickets.select.name = card.name;
                this.tickets.select.type = card.type;
                this.tickets.select.category = card.category;

                this.tickets.select.evolved = this.tickets.select.type < 3 ? 0 : this.tickets.select.evolved;
                var max_star = this.tickets.select.evolved == 0 ? this.tickets.select.type : this.tickets.select.type + 1;
                var max_level = this.tickets.select.evolved == 0 ? (this.tickets.select.type - 1) * 10 : this.tickets.select.type * 10;
                if (this.tickets.select.type < 3) {
                    max_star = 1;
                    max_level = this.tickets.select.type == 2 ? 10 : 5;
                } else {
                    max_star += 1;
                    max_level += 10;
                }

                if (this.tickets.select.star > max_star) {
                    this.tickets.select.star = max_star;
                }
                if (this.tickets.select.level > max_level) {
                    this.tickets.select.level = max_level;
                }
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
        //24小时羁绊
        'challenges.select.card_id': function(newVal, oldVal) {
            var card_id = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            var card = this.cards[card_id];
            if (card) {
                this.challenges.select.name = card.name;
                this.challenges.select.type = card.type;
                this.challenges.select.category = card.category;

                this.challenges.select.evolved = this.challenges.select.type < 3 ? 0 : this.challenges.select.evolved;
                var max_star = this.challenges.select.evolved == 0 ? this.challenges.select.type : this.challenges.select.type + 1;
                var max_level = this.challenges.select.evolved == 0 ? (this.challenges.select.type - 1) * 10 : this.challenges.select.type * 10;
                if (this.challenges.select.type < 3) {
                    max_star = 1;
                    max_level = this.challenges.select.type == 2 ? 10 : 5;
                } else {
                    max_star += 1;
                    max_level += 10;
                }

                if (this.challenges.select.star > max_star) {
                    this.challenges.select.star = max_star;
                }
                if (this.challenges.select.level > max_level) {
                    this.challenges.select.level = max_level;
                }
            }

            if (!this.empty(this.challenges.select.lock)) {
                if (this.challenges.select.lock.card_id != card_id) {
                    this.challenges.select.lock = {};
                }
            }
            if (this.empty(this.challenges.select.lock)) {
                this.update_challenge_select();
            }
        },
        'challenges.select.evolved': function(newVal, oldVal) {
            this.challenges.select.evolved = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);

            if (!this.empty(this.challenges.select.lock)) {
                if (this.challenges.select.lock.evolved != newVal) {
                    this.challenges.select.lock = {};
                }
            }
            if (this.empty(this.challenges.select.lock)) {
                this.update_challenge_select();
            }
        },
        'challenges.select.star': function(newVal, oldVal) {
            this.challenges.select.star = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);

            if (!this.empty(this.challenges.select.lock)) {
                if (this.challenges.select.lock.star != newVal) {
                    this.challenges.select.lock = {};
                }
            }
            if (this.empty(this.challenges.select.lock)) {
                this.update_challenge_select();
            }
        },
        'challenges.select.level': function(newVal, oldVal) {
            this.challenges.select.level = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);

            if (!this.empty(this.challenges.select.lock)) {
                if (this.challenges.select.lock.level != newVal) {
                    this.challenges.select.lock = {};
                }
            }
            if (this.empty(this.challenges.select.lock)) {
                this.update_challenge_select();
            }
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
        'levels.category': function(newVal, oldVal) {
            this.double_cards();
        },
        //票房反推
        'reverse.separate.decisiveness': function(newVal, oldVal) {
            this.reverse.separate.decisiveness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.separate.creativity': function(newVal, oldVal) {
            this.reverse.separate.creativity = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.separate.kindness': function(newVal, oldVal) {
            this.reverse.separate.kindness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.separate.activity': function(newVal, oldVal) {
            this.reverse.separate.kindness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.addup.decisiveness': function(newVal, oldVal) {
            this.reverse.addup.decisiveness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.addup.creativity': function(newVal, oldVal) {
            this.reverse.addup.creativity = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.addup.kindness': function(newVal, oldVal) {
            this.reverse.addup.kindness = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        'reverse.addup.activity': function(newVal, oldVal) {
            this.reverse.addup.activity = isNaN(parseInt(newVal, 10)) ? newVal : parseInt(newVal, 10);
            this.update_reverse_scores();
        },
        // 'batch.option': function(newVal, oldVal){
        //     if(newVal == 'export_data'){
        //         if(this.batch.source == 'all'){
        //             this.batch.source = 'calculator';
        //         }
        //     }
        // },
        'challenge_select.level': function(newVal, oldVal) {
            if (!this.empty(this.challenges.challenge)) {
                this.get_challenges();
            }

            for (var i = 0; i < this.challenge.length; i++) {
                if (this.challenge[i].level == newVal) {
                    if (i < this.challenge.length - 1 && this.challenge[i + 1].library == this.challenge[i].library) {
                        this.challenge_select.next_level = this.challenge[i + 1].level;
                    } else {
                        this.challenge_select.next_level = -1;
                    }

                    break;
                }
            }
        }
    },
    methods: {
        image_load: function(e) {
            $(e.target).closest('div').removeClass('image-load');
        },
        //24小时挑战
        get_total: function(obj) {
            var total = 0;
            var prop = this.prop;
            for (var i = 0; i < prop.length; i++) {
                total += parseInt(obj[prop[i]], 10);
            }
            return total;
        },
        get_challenges: function() {
            var total = this.get_total(this.challenges.my_company);

            if (total == 0) {
                for (key in this.company) {
                    this.challenges.my_company[key] = this.company[key];
                    // this.challenges.match_company[key] = this.company[key];
                }
            }

            this.challenge_cards();
            this.update_field_ids();

            // this.challenges.recommend_text = '点击推荐卡组，找出最小损耗组合。';
        },
        get_challenge_factor: function(challenge) {
            var ret = {};

            for (var i = 0; i < this.challenge.length; i++) {
                if (this.challenge[i].library == challenge.library && this.challenge[i].level == challenge.level) {
                    ret = this.challenge[i];
                    break;
                }
            }

            return ret;
        },
        copy: function(obj) {
            var ret = {};
            for (key in obj) {
                ret[key] = obj[key];
            }
            return ret;
        },
        challenge_next: function() {
            var ready = this.challenge_ready();
            if(ready){
                var ack = confirm('尚未记录损耗，确定进入下一关吗？');
                if(!ack){
                    return false;
                }
            }

            if (this.challenge_select.next_level != -1) {
                this.challenge_select.level = this.challenge_select.next_level;
            }
            this.clear_challenge_card('match');
        },
        challenge_cards: function() {
            var self = this;

            var list = [];
            var my_cards = [];
            var factor = self.get_challenge_factor(self.challenge_select);
            self.challenges.challenge = factor;

            var cards = self.challenges.cards;
            var card_ids = [];

            for (var i = 0; i < cards.length; i++) {
                var card = cards[i].card;
                list.push(card);
                card_ids.push(card.card_id);
            }

            for (id in self.cards) {
                id = parseInt(id, 10);
                var idx = self.my_cards.indexOf(id);
                if (idx < 0 || self.list[idx].level < 20 || card_ids.indexOf(id) >= 0) {
                    continue;
                }
                list.push(self.copy(self.list[idx]));
            }

            for (var i = 0; i < list.length; i++) {
                var score = 0;
                var card = list[i];
                var prop = self.prop;

                for (var k = 0; k < prop.length; k++) {
                    var attr = prop[k];
                    score += card[attr] * factor[attr];
                }

                my_cards.push({
                    card: card,
                    score: Math.round(score),
                    total_loss: 0,
                    loss: 0,
                    loss_unit_score: 0,
                    score_reduce: 0,
                    score_reduce_total: 0,
                    loss_unit_score_reduce: 0
                });
            }
            my_cards.sort(function(a, b) {
                return b.score - a.score;
            });

            self.challenges.cards = my_cards;
            this.update_card_ids();
        },
        challenge_get_damaged: function(option1, option2) {
            var prop = this.prop;

            var list = [];
            var cards = this.challenges[option1];
            for (var i = 0; i < cards.length; i++) {
                list.push(this.copy(cards[i]));
            }

            for (var i = 0; i < prop.length; i++) {
                var damage = this.get_challenge_card_loss(prop[i], option1, option2);
                for (var k = 0; k < list.length; k++) {
                    if (list[k].card_id > 0 && damage > 0) {
                        var p = list[k][prop[i]];
                        if (p >= damage) {
                            list[k][prop[i]] = p - damage;
                            damage = 0;
                        } else {
                            list[k][prop[i]] = 0;
                            damage -= p;
                        }
                    }
                }
            }

            for (var i = 0; i < list.length; i++) {
                list[i].score = this.get_challenge_score(list[i]);
            }

            return list;
        },
        get_damage_rate: function(card) {
            var total = 0;
            var prop = this.prop;
            for (var i = 0; i < prop.length; i++) {
                total += card[prop[i]];
            }
            return Math.ceil((card.total - total) / card.total * 100) + '%';
        },
        challenge_add_card: function(card_id) {
            var index = this.my_cards.indexOf(card_id);
            var card = this.list[index];

            var cards = this.challenges.cards;
            var idx = -1;
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].card.card_id == card_id) {
                    idx = i;
                    break;
                }
            }
            if (idx >= 0) {
                this.challenges.cards[idx].card = this.copy(card);
            } else {
                this.challenges.cards.push({
                    card: this.copy(card),
                    score: 0
                });
            }

            this.get_challenges();
        },
        challenge_remove_card: function(card_id) {
            var cards = this.challenges.cards;
            var idx = -1;
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].card.card_id == card_id) {
                    idx = i;
                    break;
                }
            }
            if (idx >= 0) {
                this.challenges.cards.splice(idx, 1);
                this.update_card_ids();
            }
        },
        challenge_reset_click: function() {
            var ack = confirm('确定重置吗？');
            if (!ack) {
                return false;
            }
            this.challenge_reset();
        },
        challenge_reset: function() {
            this.clear_challenge_card('my');
            this.clear_challenge_card('match');
            if (!this.empty(this.challenges.challenge)) {
                this.challenges.cards = [];
                this.challenges.record = [];
                this.get_challenges();
            } else if (this.challenges.record.length > 0 && this.challenges.cards.length == 0) {
                this.get_challenges();
                var prop = this.prop;
                var record = this.challenges.record;

                for (var k = record.length - 1; k >= 0; k--) {
                    var damaged = record[k].my_damaged;

                    for (var j = 0; j < damaged.length; j++) {
                        var my_card = damaged[j];

                        if (my_card.card_id != 0) {
                            for (var i = 0; i < this.challenges.cards.length; i++) {
                                var card = this.challenges.cards[i].card;
                                if (card.card_id == my_card.card_id) {
                                    for (var t = 0; t < prop.length; t++) {
                                        card[prop[t]] = my_card[prop[t]];
                                    }

                                    break;
                                }
                            }
                        }
                    }
                }
            }

            if (!this.challenges.ready && this.challenges.record.length == 0) {
                this.challenges.option = 'match';
            }
        },
        challenge_clear_history: function(idx) {
            this.challenges.history = [];
            this.challenges.option = 'match';
        },
        challenge_remove_history: function(idx) {
            this.challenges.history.splice(idx, 1);
            if (this.challenges.history.length == 0) {
                this.challenges.option = 'match';
            }
        },
        challenge_use_history: function(idx) {
            var history = this.challenges.history[idx];
            this.challenges.match_company = this.copy(history.match_company);
            this.challenges.match_bonus = history.match_bonus;

            var list = [];
            for (var i = 0; i < history.match.length; i++) {
                list.push(this.copy(history.match[i]));
            }
            this.clear_challenge_card('match');
            this.challenges.match = list;

            this.challenges.option = 'match';
        },
        challenge_record: function() {
            if (!this.challenge_ready()) {
                return false;
            }

            var list_my = [];
            var list_match = [];
            var history_match = [];
            var card_total = 0;
            for (var i = 0; i < this.challenges.my.length; i++) {
                list_my.push(this.copy(this.challenges.my[i]));
            }
            for (var i = 0; i < this.challenges.match.length; i++) {
                list_match.push(this.copy(this.challenges.match[i]));
                history_match.push(this.copy(this.challenges.match[i]));
                card_total += this.get_total(this.challenges.match[i]);
            }

            var record = {
                idx: this.challenges.record.length + 1,
                my: list_my,
                match: list_match,
                my_damaged: this.challenge_get_damaged('my', 'match'),
                match_damaged: this.challenge_get_damaged('match', 'my')
            };
            this.challenges.record.push(record);
            this.challenges.record.sort(function(a, b) {
                return b.idx - a.idx;
            });

            this.challenges.history.push({
                match: history_match,
                match_company: this.copy(this.challenges.match_company),
                card_total: card_total,
                company_total: this.get_total(this.challenges.match_company),
                match_bonus: this.challenges.match_bonus
            });

            var list = this.challenge_get_damaged('match', 'my');
            this.clear_challenge_card('match');
            this.challenges.match = list;

            var prop = this.prop;
            for (var k = 0; k < record.my_damaged.length; k++) {
                var my_card = record.my_damaged[k];
                for (var i = 0; i < this.challenges.cards.length; i++) {
                    var card = this.challenges.cards[i].card;
                    if (card.card_id == my_card.card_id) {
                        for (var j = 0; j < prop.length; j++) {
                            card[prop[j]] = my_card[prop[j]];
                        }
                        break;
                    }
                }
            }
            this.clear_challenge_card('my');
            this.get_challenges();
            this.challenges.option = 'match';
        },
        update_card_ids: function() {
            var ids = [];
            var cards = this.challenges.cards;
            for (var i = 0; i < cards.length; i++) {
                ids.push(cards[i].card.card_id);
            }
            this.challenges.card_ids = ids;
        },
        update_field_ids: function() {
            var record = this.challenges.record;
            var cards = this.challenges.cards;
            var ids = [];
            var my_ids = [];
            var prop = this.prop;

            for (var i = 0; i < cards.length; i++) {
                var card = cards[i].card;
                if (card.total != this.get_total(card)) {
                    ids.push(card.card_id);
                }
            }

            for (var i = 0; i < record.length; i++) {
                var my = record[i].my;
                for (var j = 0; j < my.length; j++) {
                    var card = my[j];
                    if (card.card_id != 0 && ids.indexOf(card.card_id) < 0) {
                        ids.push(card.card_id);
                    }
                }
            }

            var my = this.challenges.my;
            for (var j = 0; j < my.length; j++) {
                var card = my[j];
                if (card.card_id != 0 && ids.indexOf(card.card_id) < 0) {
                    ids.push(card.card_id);
                }
                my_ids.push(card.card_id);
            }

            this.challenges.field_ids = ids;
            this.challenges.my_ids = my_ids;
        },
        challenge_recommend_choice: function(){
            var field_ids = this.challenges.field_ids;

            var choice = [];
            var list = [];

            for (var i = 0; i < this.challenges.cards.length; i++) {
                var card = this.challenges.cards[i].card;
                if (field_ids.indexOf(card.card_id) >= 0) {
                    choice.push(card);
                } else {
                    list.push(card);
                }
            }

            list.sort(function(a, b) {
                return b.total - a.total;
            });

            var limit = 30 - choice.length;

            if(limit <= 0){
                //do nothing
            } else if (list.length > limit) {
                var line = list[limit - 1].total;
                var gap = 200;
                for (var i = 0; i < list.length; i++) {
                    var card = list[i];
                    if (card.total > line - gap) {
                        choice.push(card);
                    }
                }
            } else {
                for (var i = 0; i < list.length; i++) {
                    choice.push(list[i]);
                }
            }

            var cards = [];
            for (var i = 0; i < choice.length; i++) {
                var card = choice[i];
                cards.push({
                    card: card,
                    score: this.get_challenge_score(card)
                });
            }
            if (cards.length > 30) {
                cards = cards.slice(0, 30);
            }

            var ids = [];
            for(var i = 0; i < cards.length; i++){
                ids.push(cards[i].card.card_id);
            }

            this.challenges.recommend_choice = ids;
        },
        challenge_recommend: function() {
            this.clear_challenge_card('my');
            if (this.challenges.match[0].card_id == 0 && this.challenges.match[1].card_id == 0 && this.challenges.match[2].card_id == 0) {
                return false;
            }

            var field_ids = this.challenges.field_ids;

            var choice = [];
            var list = [];

            for (var i = 0; i < this.challenges.cards.length; i++) {
                var card = this.challenges.cards[i].card;
                if (field_ids.indexOf(card.card_id) >= 0) {
                    choice.push(card);
                } else {
                    list.push(card);
                }
            }

            list.sort(function(a, b) {
                return b.total - a.total;
            });

            var limit = 30 - choice.length;

            if(limit <= 0){
                //do nothing
            } else if (list.length > limit) {
                var line = list[limit - 1].total;
                var gap = 200;
                for (var i = 0; i < list.length; i++) {
                    var card = list[i];
                    if (card.total > line - gap) {
                        choice.push(card);
                    }
                }
            } else {
                for (var i = 0; i < list.length; i++) {
                    choice.push(list[i]);
                }
            }

            var cards = [];
            for (var i = 0; i < choice.length; i++) {
                var card = choice[i];
                cards.push({
                    card: card,
                    score: this.get_challenge_score(card)
                });
            }
            if (cards.length > 30) {
                cards = cards.slice(0, 30);
            }

            var empty_card = {
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
            };
            cards.push({
                card: empty_card,
                score: 0
            });
            cards.sort(function(a, b) {
                return a.score - b.score;
            });

            var exclude = [];
            var calc = this.challenges.calc;
            var result = [];
            var count = cards.length;
            var match_score = this.get_challenge_total_score('match');
            var threshold = parseInt(this.challenges.threshold, 10) || 0;
            var vo = [];
            var loss = [-1, -1, -1];

            this.challenges.calc_company = this.challenges.my_company;
            this.challenges.calc_bonus = this.challenges.my_bonus;

            for (var i = 0; i < count; i++) {
                vo[0] = cards[i];

                // console.log(1, vo[0].card.name);

                if (vo[0].card.card_id == 0 || vo[0].score == 0) {
                    continue;
                }

                for (var t = 0; t < 3; t++) {
                    if (t > 0) {
                        vo[t] = {
                            card: empty_card,
                            score: 0
                        };
                    }

                    this.challenges.calc[t].card_id = vo[t].card.card_id;
                    this.challenges.calc[t].evolved = vo[t].card.evolved;
                    this.challenges.calc[t].star = vo[t].card.star;
                    this.challenges.calc[t].level = vo[t].card.level;
                    this.challenges.calc[t].decisiveness = parseInt(vo[t].card.decisiveness, 10);
                    this.challenges.calc[t].creativity = parseInt(vo[t].card.creativity, 10);
                    this.challenges.calc[t].kindness = parseInt(vo[t].card.kindness, 10);
                    this.challenges.calc[t].activity = parseInt(vo[t].card.activity, 10);
                    this.challenges.calc[t].name = vo[t].card.name;
                    this.challenges.calc[t].type = vo[t].card.type;
                    this.challenges.calc[t].category = vo[t].card.category;
                    this.challenges.calc[t].total = vo[t].card.total;
                    this.challenges.calc[t].score = vo[t].score;
                }

                var score0 = this.get_challenge_total_score('calc');

                // console.log(1, score0, score0 >= match_score + threshold);

                if (score0 >= match_score + threshold) {
                    var loss0 = this.get_challenge_card_loss_total('calc', 'match');

                    // console.log(1, loss0, loss[0], loss0 <= loss[0]);

                    if (loss[0] < 0) {
                        loss[0] = loss0;
                    } else {
                        if (loss0 <= loss[0]) {
                            loss[0] = loss0;
                        } else {
                            continue;
                        }
                    }
                }

                // console.log(1, loss0, 'live0');

                for (var j = 0; j < count; j++) {
                    vo[1] = cards[j];

                    // console.log('----------', 1, vo[0].card.name);
                    // console.log(2, vo[1].card.name);

                    var md_key = i + ':' + j;
                    if (exclude.indexOf(md_key) >= 0 || j == i || (vo[1].card.card_id != 0 && vo[1].score == 0)) {
                        continue;
                    }
                    var ex_key = j + ':' + i;
                    exclude.push(ex_key);

                    for (var t = 0; t < 3; t++) {
                        if (t > 1) {
                            vo[t] = {
                                card: empty_card,
                                score: 0
                            };
                        }

                        this.challenges.calc[t].card_id = vo[t].card.card_id;
                        this.challenges.calc[t].evolved = vo[t].card.evolved;
                        this.challenges.calc[t].star = vo[t].card.star;
                        this.challenges.calc[t].level = vo[t].card.level;
                        this.challenges.calc[t].decisiveness = parseInt(vo[t].card.decisiveness, 10);
                        this.challenges.calc[t].creativity = parseInt(vo[t].card.creativity, 10);
                        this.challenges.calc[t].kindness = parseInt(vo[t].card.kindness, 10);
                        this.challenges.calc[t].activity = parseInt(vo[t].card.activity, 10);
                        this.challenges.calc[t].name = vo[t].card.name;
                        this.challenges.calc[t].type = vo[t].card.type;
                        this.challenges.calc[t].category = vo[t].card.category;
                        this.challenges.calc[t].total = vo[t].card.total;
                        this.challenges.calc[t].score = vo[t].score;
                    }

                    var score1 = this.get_challenge_total_score('calc');

                    // console.log(2, score1, score1 >= match_score + threshold);

                    if (score1 >= match_score + threshold) {
                        var loss1 = this.get_challenge_card_loss_total('calc', 'match');

                        // console.log(2, loss1, loss[1], loss1 <= loss[1]);

                        if (loss[1] < 0) {
                            loss[1] = loss1;
                        } else {
                            if (loss1 <= loss[1]) {
                                loss[1] = loss1;
                            } else {
                                continue;
                            }
                        }
                    }

                    // console.log(2, loss1, 'live1');

                    for (var k = 0; k < count; k++) {
                        vo[2] = cards[k];

                        // console.log('----------', 1, vo[0].card.name);
                        // console.log('----------', 2, vo[1].card.name);
                        // console.log(3, vo[2].card.name, vo[1].card.card_id == 0 && vo[2].card.card_id != 0, k == i, k == j && vo[2].card.card_id != 0, vo[2].card.card_id != 0 && vo[2].score == 0);

                        if ((vo[1].card.card_id == 0 && vo[2].card.card_id != 0) || k == i || (k == j && vo[2].card.card_id != 0) || (vo[2].card.card_id != 0 && vo[2].score == 0)) {
                            continue;
                        }

                        var key = i + ':' + j + ':' + k;

                        if (exclude.indexOf(key) >= 0) {
                            continue;
                        }
                        var ex_key1 = i + ':' + k + ':' + j;
                        var ex_key2 = j + ':' + k + ':' + i;

                        exclude.push(ex_key1);
                        exclude.push(ex_key2);

                        for (var t = 0; t < 3; t++) {
                            this.challenges.calc[t].card_id = vo[t].card.card_id;
                            this.challenges.calc[t].evolved = vo[t].card.evolved;
                            this.challenges.calc[t].star = vo[t].card.star;
                            this.challenges.calc[t].level = vo[t].card.level;
                            this.challenges.calc[t].decisiveness = parseInt(vo[t].card.decisiveness, 10);
                            this.challenges.calc[t].creativity = parseInt(vo[t].card.creativity, 10);
                            this.challenges.calc[t].kindness = parseInt(vo[t].card.kindness, 10);
                            this.challenges.calc[t].activity = parseInt(vo[t].card.activity, 10);
                            this.challenges.calc[t].name = vo[t].card.name;
                            this.challenges.calc[t].type = vo[t].card.type;
                            this.challenges.calc[t].category = vo[t].card.category;
                            this.challenges.calc[t].total = vo[t].card.total;
                            this.challenges.calc[t].score = vo[t].score;
                        }

                        var my_score = this.get_challenge_total_score('calc');

                        // console.log(3, my_score, my_score < match_score + threshold);

                        if (my_score < match_score + threshold) {
                            continue;
                        }

                        // console.log(3, my_score, 'live2');

                        var total_loss = this.get_challenge_card_loss_total('calc', 'match');
                        // var card_select = [];
                        // var card_key = key.split(':');
                        // for(var t = 0; t < card_key.length; t++){
                        //     card_select.push(cards[card_key[t]].card.name);
                        // }
                        result.push({
                            key: key,
                            // card_select: card_select,
                            score: my_score,
                            loss: total_loss
                        });
                    }
                }
            }

            if (result.length == 0) {
                var max_score = 0;
                for (var i = 1; i <= 3; i++) {
                    max_score += cards[cards.length - i].score;
                    // console.log(max_score);
                }
                max_score += this.get_challenge_company_score('my');
                // console.log(max_score);

                max_score += this.get_challenge_bonus_score('my');
                // console.log(max_score);

                var diff = match_score + threshold - max_score;
                this.challenges.recommend_text = '当前卡组无法达到过关要求，还需要磨掉 ' + diff + ' 分';
                return false;
            } else {
                this.challenges.recommend_text = '';
            }

            result.sort(function(a, b) {
                var res = a.loss - b.loss;
                if (res == 0) {
                    res = a.score - b.score;
                }

                return res;
            });

            // console.log(result);

            var comb = result[0].key.split(':');
            for (var t = 0; t < comb.length; t++) {
                var item = cards[comb[t]];
                this.challenges.my[t].card_id = item.card.card_id;
                this.challenges.my[t].evolved = item.card.evolved;
                this.challenges.my[t].star = item.card.star;
                this.challenges.my[t].level = item.card.level;
                this.challenges.my[t].decisiveness = parseInt(item.card.decisiveness, 10);
                this.challenges.my[t].creativity = parseInt(item.card.creativity, 10);
                this.challenges.my[t].kindness = parseInt(item.card.kindness, 10);
                this.challenges.my[t].activity = parseInt(item.card.activity, 10);
                this.challenges.my[t].name = item.card.name;
                this.challenges.my[t].type = item.card.type;
                this.challenges.my[t].category = item.card.category;
                this.challenges.my[t].total = item.card.total;
                this.challenges.my[t].score = item.score;
            }

            this.update_field_ids();
            this.challenge_ready();
            this.challenges.option = 'my';
        },
        challenge_record_retract: function() {
            var record = this.challenges.record.splice(0, 1);
            var list = [];
            for (var i = 0; i < record[0].match.length; i++) {
                list.push(this.copy(record[0].match[i]));
            }
            this.clear_challenge_card('match');
            this.challenges.match = list;

            var prop = this.prop;
            for (var k = 0; k < record[0].my.length; k++) {
                var my_card = record[0].my[k];
                for (var i = 0; i < this.challenges.cards.length; i++) {
                    var card = this.challenges.cards[i].card;
                    if (card.card_id == my_card.card_id) {
                        for (var j = 0; j < prop.length; j++) {
                            card[prop[j]] = my_card[prop[j]];
                        }
                        break;
                    }
                }
            }
            this.clear_challenge_card('my');
            this.get_challenges();

            if (!this.challenges.ready && this.challenges.record.length == 0) {
                this.challenges.option = 'match';
            }
        },
        challenge_ready: function() {
            var my_ready = false;
            var match_ready = false;

            for (var i = 0; i < this.challenges.my.length; i++) {
                if (this.challenges.my[i].card_id > 0) {
                    my_ready = true;
                    break;
                }
            }

            for (var i = 0; i < this.challenges.match.length; i++) {
                if (this.challenges.match[i].card_id > 0) {
                    match_ready = true;
                    break;
                }
            }

            var ret = my_ready && match_ready;

            if (ret) {
                this.challenges.my_damaged = this.challenge_get_damaged('my', 'match');
                this.challenges.match_damaged = this.challenge_get_damaged('match', 'my');
            }

            this.challenges.ready = ret;

            return ret;
        },
        clear_challenge_card: function(option) {
            var list = [];
            for (var idx = 0; idx < 3; idx++) {
                list[idx] = {
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
                };
            }
            this.challenges[option] = list;

            this.update_field_ids();
            this.challenge_ready();
        },
        show_challenge_edit: function(card) {
            this.challenges.select.lock = {
                evolved: card.evolved,
                star: card.star,
                level: card.level,
                card_id: card.card_id
            };

            // this.challenges.select.name = card.name;
            // this.challenges.select.type = card.type;
            // this.challenges.select.category = card.category;

            this.challenges.select.evolved = card.evolved;
            this.challenges.select.star = card.star;
            this.challenges.select.level = card.level;

            this.challenges.select.card_id = card.card_id;
            this.challenges.select.decisiveness = card.decisiveness;
            this.challenges.select.creativity = card.creativity;
            this.challenges.select.kindness = card.kindness;
            this.challenges.select.activity = card.activity;

            $('#edit').modal();
        },
        save_challenge_edit: function() {
            var card_id = this.challenges.select.card_id;
            var prop = this.prop;
            for (var i = 0; i < this.challenges.cards.length; i++) {
                var card = this.challenges.cards[i].card;
                if (card.card_id == card_id) {
                    card.evolved = this.challenges.select.evolved;
                    card.star = this.challenges.select.star;
                    card.level = this.challenges.select.level;
                    card.decisiveness = parseInt(this.challenges.select.decisiveness, 10);
                    card.creativity = parseInt(this.challenges.select.creativity, 10);
                    card.kindness = parseInt(this.challenges.select.kindness, 10);
                    card.activity = parseInt(this.challenges.select.activity, 10);

                    for(var j = 0; j < prop.length; j++){
                        if(isNaN(card[prop[j]])){
                            card[prop[j]] = 0;
                        }
                    }

                    // card.total = this.challenges.select.total;

                    var data = this.predict_card(card.card_id, card.evolved, card.star, card.level);
                    card.total = 0;
                    for (var j = 0; j < prop.length; j++) {
                        card.total += data[prop[j]];
                    }

                    break;
                }
            }

            this.get_challenges();
            $('#edit').modal('hide');
        },
        show_challenge_threshold: function() {
            this.challenges.select_threshold = this.challenges.threshold;
            $('#threshold').modal();
        },
        save_challenge_threshold: function() {
            this.challenges.threshold = parseInt(this.challenges.select_threshold, 10);
            if(isNaN(this.challenges.threshold)){
                this.challenges.threshold = 0;
            }
            $('#threshold').modal('hide');
        },
        show_challenge_card: function(idx, option) {
            this.challenges.select.idx = idx;
            this.challenges.select.option = option;
            this.challenges.select.check_head = false;
            var card = this.challenges[option][idx];

            if (card.card_id != 0) {
                this.challenges.select.lock = {
                    evolved: card.evolved,
                    star: card.star,
                    level: card.level,
                    card_id: card.card_id
                };

                this.challenges.select.evolved = card.evolved;
                this.challenges.select.star = card.star;
                this.challenges.select.level = card.level;

                // this.challenges.select.type = card.type;
                // this.challenges.select.category = card.category;

                this.challenges.select.card_id = card.card_id;
                this.challenges.select.decisiveness = card.decisiveness;
                this.challenges.select.creativity = card.creativity;
                this.challenges.select.kindness = card.kindness;
                this.challenges.select.activity = card.activity;
                // this.challenges.select.name = card.name;

                $('#challenge_typeahead').val(card.name);
            } else {
                this.challenges.select.card_id = 0;
                // this.challenges.select.evolved = 0;
                // this.challenges.select.star = 1;
                // this.challenges.select.level = 1;
                this.challenges.select.decisiveness = 0;
                this.challenges.select.creativity = 0;
                this.challenges.select.kindness = 0;
                this.challenges.select.activity = 0;
                this.challenges.select.score = 0;

                $('#challenge_typeahead').val('');
            }

            $('#24hour').modal();
        },
        show_challenge_card_select: function(idx, option) {
            this.challenges.select.idx = idx;
            this.challenges.select.option = option;

            var list = [];
            var factor = this.challenges.challenge;

            for (var i = 0; i < this.challenges.cards.length; i++) {
                var vo = this.challenges.cards[i];

                for (j = 0; j < this.challenges.calc.length; j++) {
                    var card = this.challenges.calc[j];
                    if (j == idx) {
                        var select = vo.card;
                    } else {
                        var select = this.challenges.my[j];
                    }

                    card.card_id = select.card_id;
                    card.evolved = select.evolved;
                    card.star = select.star;
                    card.level = select.level;
                    card.decisiveness = parseInt(select.decisiveness, 10);
                    card.creativity = parseInt(select.creativity, 10);
                    card.kindness = parseInt(select.kindness, 10);
                    card.activity = parseInt(select.activity, 10);
                    card.name = select.name;
                    card.type = select.type;
                    card.category = select.category;
                    card.total = select.total;
                    card.score = select.score;
                }

                // var total_loss = this.get_challenge_card_loss_total('calc', 'match');

                var prop = this.prop;
                var arr = [];
                var calc = this.challenges.calc;
                for (var j = 0; j < calc.length; j++) {
                    arr.push(this.copy(calc[j]));
                }

                var loss = [];

                for (var j = 0; j < arr.length; j++) {
                    loss[j] = this.get_total(arr[j]);
                }

                for (var j = 0; j < prop.length; j++) {
                    var damage = this.get_challenge_card_loss(prop[j], 'calc', 'match');
                    for (var k = 0; k < arr.length; k++) {
                        if (arr[k].card_id > 0 && damage > 0) {
                            var p = arr[k][prop[j]];
                            if (p >= damage) {
                                arr[k][prop[j]] = p - damage;
                                damage = 0;
                            } else {
                                arr[k][prop[j]] = 0;
                                damage -= p;
                            }
                        }
                    }
                }

                var match_score = this.get_challenge_total_score('match');
                var match_damaged = this.challenge_get_damaged('match', 'calc');
                var match_damaged_score = this.get_challenge_bonus_score('match');

                for (var j = 0; j < prop.length; j++) {
                    var prop_val = 0;
                    var attr = prop[j];
                    for (var k = 0; k < match_damaged.length; k++) {
                        if (match_damaged[k].card_id != 0) {
                            prop_val += match_damaged[k][attr];
                        }
                    }
                    prop_val += parseInt(this.challenges['match_company'][attr], 10);
                    match_damaged_score += Math.round(factor[attr] * prop_val);
                }

                calc[idx].card_id = 0;
                calc[idx].evolved = 0;
                calc[idx].star = 1;
                calc[idx].level = 1;
                calc[idx].decisiveness = 0;
                calc[idx].creativity = 0;
                calc[idx].kindness = 0;
                calc[idx].activity = 0;
                calc[idx].name = '';
                calc[idx].type = 0;
                calc[idx].category = 0;
                calc[idx].total = 0;
                calc[idx].score = 0;

                var prev_match_damaged = this.challenge_get_damaged('match', 'calc');
                var prev_match_damaged_score = this.get_challenge_bonus_score('match');

                for (var j = 0; j < prop.length; j++) {
                    var prop_val = 0;
                    var attr = prop[j];
                    for (var k = 0; k < prev_match_damaged.length; k++) {
                        if (prev_match_damaged[k].card_id != 0) {
                            prop_val += prev_match_damaged[k][attr];
                        }
                    }
                    prop_val += parseInt(this.challenges['match_company'][attr], 10);
                    prev_match_damaged_score += Math.round(factor[attr] * prop_val);
                }

                var total_loss = 0;
                for (var j = 0; j < arr.length; j++) {
                    loss[j] = this.get_total(arr[j]) - loss[j];
                    total_loss += loss[j];
                }

                vo.loss = loss[idx];
                vo.total_loss = total_loss;
                vo.loss_unit_score = Math.round(vo.score / Math.abs(vo.loss));
                vo.score_reduce = prev_match_damaged_score - match_damaged_score;
                vo.loss_unit_score_reduce = vo.loss == 0 ? 0 : Math.round(vo.score_reduce / Math.abs(vo.loss));
                vo.score_reduce_total = match_score - match_damaged_score;
                list.push(vo);
            }

            var self = this;
            list.sort(function(a, b) {
                return self.challenges.desc * (b[self.challenges.sort] - a[self.challenges.sort]);
            });

            this.challenges.field_list = list;
            this.challenge_recommend_choice();

            $('#field').modal();
        },
        challenge_select_sort: function(sort) {
            var self = this;
            if (self.challenges.sort == sort) {
                self.challenges.desc *= -1;
            } else {
                self.challenges.sort = sort;
                self.challenges.desc = 1;
            }

            self.challenges.field_list.sort(function(a, b) {
                return self.challenges.desc * (b[self.challenges.sort] - a[self.challenges.sort]);
            });
        },
        select_challenge_card: function(select) {
            var option = this.challenges.select.option;
            var card = this.challenges[option][this.challenges.select.idx];

            card.card_id = select.card.card_id;
            card.evolved = select.card.evolved;
            card.star = select.card.star;
            card.level = select.card.level;
            card.decisiveness = parseInt(select.card.decisiveness, 10);
            card.creativity = parseInt(select.card.creativity, 10);
            card.kindness = parseInt(select.card.kindness, 10);
            card.activity = parseInt(select.card.activity, 10);
            card.name = select.card.name;
            card.type = select.card.type;
            card.category = select.card.category;
            card.total = select.card.total;
            card.score = this.get_challenge_score(card);

            this.update_field_ids();
            this.challenge_ready();

            $('#field').modal('hide');
        },
        use_challenge_card: function(card_id, evolved, is_new) {
            evolved = parseInt(evolved, 10);
            if (card_id == 0) {
                card_id = this.challenges.select.card_id;
            }
            var card = this.cards[card_id];
            $('#challenge_typeahead').val(card.name);
            this.challenges.select.card_id = card_id;
            if (evolved >= 0) {
                switch (evolved) {
                    case 0:
                        this.challenges.select.evolved = 0;
                        this.challenges.select.star = card.type;
                        this.challenges.select.level = (card.type - 1) * 10;
                        break;
                    case 1:
                        this.challenges.select.evolved = 1;
                        this.challenges.select.star = is_new ? card.type + 2 : card.type + 1;
                        this.challenges.select.level = is_new ? (card.type + 1) * 10 : card.type * 10;
                        break;
                    case 2:
                        this.challenges.select.evolved = 0;
                        this.challenges.select.star = 1;
                        this.challenges.select.level = 20;
                        break;
                }
            }
            this.challenges.select.show_head = false;
        },
        save_challenge_card: function(clear) {
            var option = this.challenges.select.option;
            var card = this.challenges[option][this.challenges.select.idx];
            if (!clear) {
                var select = this.challenges.select;
            } else {
                var select = {
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
                };
            }

            card.card_id = select.card_id;
            card.evolved = select.evolved;
            card.star = select.star;
            card.level = select.level;
            card.decisiveness = parseInt(select.decisiveness, 10);
            card.creativity = parseInt(select.creativity, 10);
            card.kindness = parseInt(select.kindness, 10);
            card.activity = parseInt(select.activity, 10);
            card.name = select.name;
            card.type = select.type;
            card.category = select.category;
            // card.total = select.total;

            var prop = this.prop;
            for(var i = 0; i < prop.length; i++){
                if(isNaN(card[prop[i]])){
                    card[prop[i]] = 0;
                }
            }

            if (card.card_id != 0) {
                card.score = this.get_challenge_score(card);

                var data = this.predict_card(card.card_id, card.evolved, card.star, card.level);
                card.total = 0;
                for (var j = 0; j < prop.length; j++) {
                    card.total += data[prop[j]];
                }
            } else {
                card.score = 0;
                card.total = 0;
            }
            this.update_field_ids();
            this.challenge_ready();

            $('#24hour').modal('hide');
            $('#field').modal('hide');
        },
        get_challenge_score: function(card) {
            var prop = this.prop;
            var score = 0;

            var factor = this.challenges.challenge;

            for (var i = 0; i < prop.length; i++) {
                score += card[prop[i]] * factor[prop[i]];
            }

            return Math.round(score);
        },
        //更新羁绊选择
        update_challenge_select: function() {
            if (this.challenges.select.card_id == 0) {
                return false;
            }

            var data = this.predict_card(this.challenges.select.card_id, this.challenges.select.evolved, this.challenges.select.star, this.challenges.select.level);
            var prop = this.prop;
            var total = 0;
            var score = 0;

            var factor = this.challenges.challenge;

            for (var i = 0; i < prop.length; i++) {
                this.challenges.select[prop[i]] = data[prop[i]];

                total += data[prop[i]];
                score += data[prop[i]] * factor[prop[i]];
            }

            this.challenges.select.total = total;
            this.challenges.select.score = Math.round(score);
        },
        show_challenge_company: function(option) {
            var prop = this.prop;
            var total = 0;
            for (var i = 0; i < prop.length; i++) {
                this.challenges.company[prop[i]] = parseInt(this.challenges[option + '_company'][prop[i]], 10);
                total += this.challenges.company[prop[i]];
            }
            this.challenges.company.option = option;
            this.challenges.company.total = total;

            $('#challenge').modal();
        },
        split_challenge_company: function() {
            var prop = this.prop;
            var company = this.challenges.company;
            var total = company.total;
            var remain = total;

            for (var i = 0; i < prop.length; i++) {
                if (i == prop.length - 1) {
                    this.challenges['company'][prop[i]] = remain;
                } else {
                    remain -= Math.round(total / 4);
                    this.challenges['company'][prop[i]] = Math.round(total / 4);
                }
            }

            this.save_challenge_company();
        },
        save_challenge_company: function() {
            var prop = this.prop;
            var company = this.challenges.company;
            var option = company.option;

            for (var i = 0; i < prop.length; i++) {
                this.challenges[option + '_company'][prop[i]] = parseInt(company[prop[i]], 10);
                if(isNaN(this.challenges[option + '_company'][prop[i]])){
                    this.challenges[option + '_company'][prop[i]] = 0;
                }
            }

            $('#challenge').modal('hide');
        },
        get_challenge_company_total: function(option) {
            var prop = this.prop;
            var score = 0;
            var factor = this.challenges.challenge;

            for (var i = 0; i < prop.length; i++) {
                score += this.challenges[option + '_company'][prop[i]];
            }

            return score;
        },
        get_challenge_prop: function(attr, option) {
            var ret = 0;
            for (var i = 0; i < this.challenges[option].length; i++) {
                var card = this.challenges[option][i];
                if (card.card_id != 0) {
                    ret += card[attr];
                }
            }
            ret += parseInt(this.challenges[option + '_company'][attr], 10);
            return ret;
        },
        get_challenge_card: function(option, attr) {
            var prop = this.prop;
            var score = 0;
            for (var i = 0; i < this.challenges[option].length; i++) {
                score += this.challenges[option][i][attr] || 0;
            }
            return score;
        },
        get_challenge_card_total: function(option) {
            var prop = this.prop;
            var score = 0;
            for (var i = 0; i < prop.length; i++) {
                score += this.get_challenge_card(option, prop[i]);
            }
            return score;
        },
        get_challenge_card_loss: function(attr, option1, option2) {
            var total1 = this.get_challenge_card(option1, attr);
            var total2 = Math.floor(this.get_challenge_card(option2, attr) / 2);

            return Math.min(total1, total2);
        },
        get_challenge_card_loss_total: function(option1, option2) {
            var prop = this.prop;
            var score = 0;
            for (var i = 0; i < prop.length; i++) {
                score += this.get_challenge_card_loss(prop[i], option1, option2);
            }
            return score;
        },
        get_challenge_company_score: function(option) {
            var prop = this.prop;
            var score = 0;
            var factor = this.challenges.challenge;

            for (var i = 0; i < prop.length; i++) {
                score += factor[prop[i]] * this.challenges[option + '_company'][prop[i]];
            }

            return Math.round(score);
        },
        get_challenge_bonus_score: function(option) {
            var prop = this.prop;
            var score = 0;

            for (var i = 0; i < prop.length; i++) {
                score += this.challenges[option + '_bonus'] * this.challenges[option + '_company'][prop[i]] / 100;
            }

            return Math.round(score);
        },
        get_challenge_bonus_score_diff: function(option1, option2) {
            return this.get_challenge_bonus_score(option1) - this.get_challenge_bonus_score(option2);
        },
        get_challenge_prop_score: function(attr, option) {
            var prop = this.get_challenge_prop(attr, option);
            var factor = this.challenges.challenge;
            return Math.round(factor[attr] * prop);
        },
        get_challenge_prop_score_diff: function(attr, option1, option2) {
            return this.get_challenge_prop_score(attr, option1) - this.get_challenge_prop_score(attr, option2);
        },
        get_challenge_total_score: function(option) {
            var score = 0;
            var prop = this.prop;

            score += this.get_challenge_bonus_score(option);

            for (var i = 0; i < this.prop.length; i++) {
                score += this.get_challenge_prop_score(prop[i], option);
            }
            return score;
        },
        get_challenge_total_score_diff: function(option1, option2) {
            return this.get_challenge_total_score(option1) - this.get_challenge_total_score(option2);
        },
        //卡组分析
        get_double_tag: function(key) {
            var arr = key.split('_');
            return this.get_prop_tag(arr[0]) + '<br>' + this.get_prop_tag(arr[1]);
        },
        sort_double: function(attr) {
            this.levels.sort = attr;
            this.double.cards.sort(function(a, b) {
                return b[attr] - a[attr];
            });
        },
        sort_double_total: function() {
            var self = this;

            if (self.double.sort == 0) {
                self.double.sort = -1;
            } else {
                self.double.sort *= -1;
            }

            self.double.my.sort(function(a, b) {
                return self.double.sort * (b.total - a.total);
            });
        },
        show_double: function() {
            // this.double.sort = 0;
            this.levels.config = false;
            this.levels.card = 'all';
            this.levels.r = 'evolved';
            this.levels.sr = 'evolved';
            this.levels.ssr = 'evolved';
            this.double_cards();
            this.nav = 'double';
        },
        double_cards: function() {
            var self = this;
            var my_cards = [];
            var cards = self.cards;
            var factor = self.levels.factor.sort(function(a, b) {
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

                if (self.levels.category != 0 && self.levels.category != card.category) {
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
                } else if (config == 'evolved2') {
                    card.evolved = 1;
                    card.star = card.type + 2;
                    card.level = (card.type + 1) * 10;
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
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        if (j != i) {
                            var remain = [];
                            for (var k = 0; k < 4; k++) {
                                if (k != i & k != j) {
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

                            if (!my[key]) {
                                my[key] = [];
                            }

                            if (idx >= 0) {
                                remain = [];
                                for (var k = 0; k < 4; k++) {
                                    if (k != i & k != j) {
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

                for (key in double) {
                    item[key] = double[key];
                }

                my_cards.push(item);
            }

            var sort = self.levels.sort;
            my_cards.sort(function(a, b) {
                return b[sort] - a[sort];
            });

            var double_my = [];
            for (key in my) {
                my[key].sort(function(a, b) {
                    return b.score - a.score;
                });

                var top = my[key].slice(0, 3);
                var my_top = [];
                var total = 0;
                for (var i = 0; i < top.length; i++) {
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
        add_to_table: function() {
            var prop = this.prop;
            for (var i = 0; i < prop.length; i++) {
                this.tickets.match_company[prop[i]] = this.reverse.scores[prop[i]];
            }
            this.reset_reverse();
            $('#reverse').modal('hide');
        },
        reset_reverse: function() {
            var prop = this.prop;
            for (var i = 0; i < prop.length; i++) {
                this.reverse.separate[prop[i]] = '';
                this.reverse.addup[prop[i]] = '';
                this.reverse.scores[prop[i]] = '';
            }
        },
        has_reverse_scores: function() {
            var ret = true;
            var prop = this.prop;
            for (var i = 0; i < prop.length; i++) {
                if (!this.reverse.scores[prop[i]]) {
                    ret = false;
                    break;
                }
            }
            return ret;
        },
        update_reverse_scores: function() {
            var prop = this.prop;
            var option = this.reverse.option;
            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);
            var sum = 0;
            for (var i = 0; i < prop.length; i++) {
                if (this.reverse[option][prop[i]]) {
                    var total = this.reverse[option][prop[i]];
                    if (option == 'addup') {
                        var t = total;
                        total = total - sum;
                        sum = t;

                        this.reverse['separate'][prop[i]] = total;
                    } else if (option == 'separate') {
                        sum += t;

                        this.reverse['addup'][prop[i]] = sum;
                    }

                    var score = this.get_ticket_reverse_prop_score(prop[i], 'match');
                    var attr = (total - score) / factor[prop[i]];

                    this.reverse.scores[prop[i]] = Math.round(attr);
                }
            }
        },
        show_reverse: function() {
            if (this.get_ticket_empty('match') >= 0) {
                this.show_msg('请先设置对手阵容');
                return false;
            }

            $('#reverse').modal();
        },
        get_ticket_reverse_prop_score: function(attr, option) {
            var prop = this.get_ticket_reverse_prop(attr, option);
            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);
            return Math.round(factor[attr] * prop);
        },
        get_ticket_reverse_prop: function(attr, option) {
            var ret = 0;
            for (var i = 0; i < this.tickets[option].length; i++) {
                var card = this.tickets[option][i];
                if (!this.empty(card)) {
                    ret += card[attr];
                }
            }
            // ret += this.tickets[option + '_company'][attr];
            return ret;
        },
        get_ticket_prop_score: function(attr, option) {
            var prop = this.get_ticket_prop(attr, option);
            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);
            return Math.round(factor[attr] * prop);
        },
        get_ticket_prop_score_diff: function(attr, option1, option2) {
            return this.get_ticket_prop_score(attr, option1) - this.get_ticket_prop_score(attr, option2);
        },
        get_ticket_character_score: function(option) {
            var score = 0;
            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);
            var weight = this.get_ticket_weight(this.tickets.ticket.star) - 1;
            var prop = this.prop;
            for (var i = 0; i < this.tickets[option].length; i++) {
                var card = this.tickets[option][i];
                if (this.card_id == 0) {
                    continue;
                }

                if (card.category != this.tickets.ticket.category) {
                    continue;
                }
                for (var j = 0; j < prop.length; j++) {
                    score += card[prop[j]] * factor[prop[j]] * weight;
                }
            }
            return Math.round(score);
        },
        get_ticket_character_score_diff: function(option1, option2) {
            return this.get_ticket_character_score(option1) - this.get_ticket_character_score(option2);
        },
        get_ticket_total_score: function(option) {
            var score = 0;
            score += this.get_ticket_company_score(option);
            for (var i = 0; i < this.tickets[option].length; i++) {
                score += this.tickets[option][i].score || 0;
            }
            return score;
        },
        get_ticket_total_score_diff: function(option1, option2) {
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
            for (var i = 0; i < this.tickets[option].length; i++) {
                if (this.tickets[option][i].card_id == 0) {
                    ret = i;
                    break;
                }
            }
            return ret;
        },
        set_ticket_empty: function(option) {
            var idx = this.get_ticket_empty(option);
            this.tickets.select.idx = idx;
            this.tickets.select.option = 'match';
            this.tickets.option = 'match';
            if (idx >= 0) {
                this.show_battle(idx, option);
            }
        },
        get_ticket_prop: function(attr, option) {
            var ret = 0;
            for (var i = 0; i < this.tickets[option].length; i++) {
                var card = this.tickets[option][i];
                if (card.card_id != 0) {
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
            if (card.card_id != 0) {
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
            card.decisiveness = parseInt(select.decisiveness, 10);
            card.creativity = parseInt(select.creativity, 10);
            card.kindness = parseInt(select.kindness, 10);
            card.activity = parseInt(select.activity, 10);
            card.name = select.name;
            card.type = select.type;
            card.category = select.category;
            card.total = select.total;
            card.score = this.get_battle_score(card);

            $('#battle').modal('hide');
        },
        save_ticket_company: function() {
            var prop = this.prop;
            var company = this.tickets.company;
            var option = company.option;

            for (var i = 0; i < prop.length; i++) {
                this.tickets[option + '_company'][prop[i]] = company[prop[i]];
            }

            $('#ticket').modal('hide');
        },
        show_ticket_company: function(option) {
            var prop = this.prop;

            for (var i = 0; i < prop.length; i++) {
                this.tickets.company[prop[i]] = this.tickets[option + '_company'][prop[i]];
            }
            this.tickets.company.option = option;

            $('#ticket').modal();
        },
        show_ticket: function() {
            if (!this.empty(this.today) && this.list.length >= 3) {
                this.tickets.ticket_id = this.today.ticket_id;
                this.tickets.category = this.today.category;
                this.tickets.star = this.today.star;
                this.get_tickets();
            }
            this.nav = 'ticket';
        },
        get_tickets: function() {
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
        ticket_cards: function() {
            var self = this;

            if (self.list.length < 3 || self.empty(self.tickets.ticket)) {
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
                } else if (config == 'evolved2') {
                    card.evolved = 1;
                    card.star = card.type + 2;
                    card.level = (card.type + 1) * 10;
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

                if (card.category == self.tickets.ticket.category) {
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
            if (this.tickets.select.card_id == 0) {
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

            if (this.tickets.select.category == this.tickets.ticket.category) {
                score *= weight;
            }

            this.tickets.select.total = total;
            this.tickets.select.score = Math.round(score);
        },
        get_battle_score: function(card) {
            var prop = this.prop;
            var score = 0;

            var factor = this.get_ticket_factor(this.tickets.ticket.ticket_id);
            var weight = this.get_ticket_weight(this.tickets.ticket.star);

            for (var i = 0; i < prop.length; i++) {
                score += card[prop[i]] * factor[prop[i]];
            }

            if (card.category == this.tickets.ticket.category) {
                score *= weight;
            }

            return Math.round(score);
        },
        show_today: function() {
            if (this.today) {
                this.ticket_select.ticket_id = this.today.ticket_id;
                this.ticket_select.category = this.today.category;
                this.ticket_select.star = this.today.star;
            }
            $('#today').modal();
        },
        save_today: function() {
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
        ticket_combine: function() {
            if (this.list.length < 3 || this.empty(this.today)) {
                return false;
            }

            var list = this.list;
            var scores = [];
            var factor = this.get_ticket_factor(this.today.ticket_id);
            var weight = this.get_ticket_weight(this.today.star);
            var prop = this.prop;
            var combine = [];

            for (var i = 0; i < list.length; i++) {
                var card = list[i];
                var score = 0;

                for (var j = 0; j < prop.length; j++) {
                    score += card[prop[j]] * factor[prop[j]];
                }

                if (card.category == this.today.category) {
                    score *= weight;
                }

                scores.push({
                    card: card,
                    score: score
                });
            }

            scores.sort(function(a, b) {
                return b.score - a.score;
            });

            for (var i = 0; i < 3; i++) {
                combine.push(scores[i].card.name);
            }

            this.tickets.combine = combine;
        },
        get_ticket_weight: function(star) {
            star = parseInt(star, 10);
            var ret = 1;
            switch (star) {
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
        get_ticket_factor: function(ticket_id) {
            var ret = {};

            for (var i = 0; i < this.ticket.length; i++) {
                if (this.ticket[i].id == ticket_id) {
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

            if (card.card_id > 0) {
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
            }

            $('#combine').modal();
        },
        save_combine: function() {
            var card = this.levels.combine[this.levels.select.idx];
            var select = this.levels.select;

            card.card_id = select.card_id;
            card.evolved = select.evolved;
            card.star = select.star;
            card.level = select.level;
            card.decisiveness = parseInt(select.decisiveness, 10);
            card.creativity = parseInt(select.creativity, 10);
            card.kindness = parseInt(select.kindness, 10);
            card.activity = parseInt(select.activity, 10);
            card.name = select.name;
            card.type = select.type;
            card.category = select.category;
            card.total = select.total;
            card.score = this.get_combine_score(card);

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
        get_pass: function(line, score) {
            var ret = '';
            if (score >= line) {
                ret = '√';
            } else {
                ret = '×';
            }
            if (line == 0) {
                ret = '';
            }
            return ret;
        },
        get_levels: function() {
            var self = this;
            self.levels.overflow = false;
            // self.levels.multiple = 2;
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

                                if (([3].indexOf(item.category) >=0 && [2, 5].indexOf(card.category) < 0) ||
                                    ([4,8].indexOf(item.category) >= 0 && [4, 5].indexOf(card.category) < 0) ||
                                    ([5,7].indexOf(item.category) >=0 && [1, 5].indexOf(card.category) < 0) ||
                                    ([6,9].indexOf(item.category) >= 0 && [3, 5].indexOf(card.category) < 0)) {
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
                                if (my_cards.length > j) {
                                    item.combine.push(my_cards[j].name);
                                    total += my_cards[j].score;
                                } else {
                                    item.combine.push('未设置');
                                }
                            }

                            var prop = self.prop;
                            for (var k = 0; k < prop.length; k++) {
                                if(!self.company[prop[k]]){
                                    self.company[prop[k]] = 0;
                                }

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
                if(!self.company[key]){
                    self.company[key] = 0;
                }
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
        reset_config: function() {
            this.levels.config = false;
            this.levels.card = 'my';
            this.levels.r = 'remain';
            this.levels.sr = 'remain';
            this.levels.ssr = 'remain';
        },
        //关卡羁绊得分计算
        level_cards: function() {
            var self = this;

            if (self.list.length < 3 || self.empty(self.level)) {
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

                if (([3].indexOf(self.levels.level.category) >= 0 && [2, 5].indexOf(card.category) < 0) ||
                    ([4,8].indexOf(self.levels.level.category) >= 0 && [4, 5].indexOf(card.category) < 0) ||
                    ([5,7].indexOf(self.levels.level.category) >= 0 && [1, 5].indexOf(card.category) < 0) ||
                    ([6,9].indexOf(self.levels.level.category) >= 0 && [3, 5].indexOf(card.category) < 0)) {
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
                } else if (config == 'evolved2') {
                    card.evolved = 1;
                    card.star = card.type + 2;
                    card.level = (card.type + 1) * 10;
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
                if (my_cards.length > i) {
                    var score = my_cards[i].score;
                    var my_card = my_cards[i].card;
                    var card = {};
                    for (key in my_card) {
                        card[key] = my_card[key];
                    }
                    card.score = score;
                    combine.push(card);
                } else {
                    combine.push({
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
                    });
                }
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
            } else if (this.batch.source == 'debug') {
                var self = this;
                $('#export_data').button('loading');

                setTimeout(function() {
                    var export_data = JSON.stringify(self.$data);
                    self.batch.export = export_data;
                    $('#export_data').button('reset');
                }, 500);
            }
        },
        //导出数据下载
        export_data_download: function() {
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
                var export_data = JSON.stringify({
                    'user-defined': data,
                    'pre-defined': [],
                    'company': this.company
                });
                self.download_data(export_data);
            } else if (this.batch.source == 'excel') {
                data.push(['公司属性', this.company.decisiveness, this.company.creativity, this.company.kindness, this.company.activity].join("\t"));
                for (var i = 0; i < list.length; i++) {
                    var arr = list[i].name.split('·');
                    data.push([arr[1], list[i].decisiveness, list[i].creativity, list[i].kindness, list[i].activity].join("\t"));
                }
                var export_data = data.join("\n");
                self.download_data(export_data);
            } else if (this.batch.source == 'debug') {
                var self = this;
                $('#export_data_download').button('loading');

                setTimeout(function() {
                    var export_data = JSON.stringify(self.$data);
                    self.download_data(export_data);
                    $('#export_data_download').button('reset');
                }, 500);
            }
        },
        download_data: function(data) {
            var self = this;

            // zip.workerScriptsPath = 'lib/';
            // zip.createWriter(new zip.BlobWriter(), function(writer) {
            //     // use a TextReader to read the String to add
            //     writer.add("export.txt", new zip.TextReader(data), function() {
            //         // onsuccess callback

            //         // close the zip writer
            //         writer.close(function(blob) {
            //             // blob contains the zip file as a Blob object

            //             var URL = window.webkitURL || window.mozURL || window.URL;
            //             var downloadLink = document.createElement("a");
            //             downloadLink.href = URL.createObjectURL(blob);
            //             downloadLink.download = "debug.zip";
            //             document.body.appendChild(downloadLink);
            //             downloadLink.click();
            //             document.body.removeChild(downloadLink);
            //             URL.revokeObjectURL(blob);
            //         });
            //     }, function(currentIndex, totalIndex) {
            //         // onprogress callback
            //     });
            // }, function(error) {
            //     // onerror callback
            // });

            var blob = new Blob([data], {type : 'text/plain'});
            var formData = new FormData();
            formData.append('file', blob, 'export.log');

            $.ajax({
                url: self.base_url + 'debug',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function(res) {
                    if (res.status == 1) {
                        self.batch.export = '上传ID：' + res.id;
                    } else if (res.info) {
                        self.show_msg(res.info);
                    }
                },
                error: function() {
                    self.show_msg('请求失败');
                }
            });
        },
        //导入数据
        import_data: function() {
            var self = this;
            var data = self.batch.data;
            var list = [];
            if (self.batch.source == 'all') {
                var names = [];
                for (id in this.cards) {
                    var card = this.cards[id];
                    if (card.type < 3) {
                        continue;
                    }

                    var arr = card.name.split('·');
                    names.push(arr[1]);
                    data = JSON.stringify({ 'user-defined': [], 'pre-defined': names });
                }
            }

            if (self.batch.source == 'calculator' || self.batch.source == 'all') {
                //测试数据：
                //{"user-defined":[{"name":"新年大吉","rarity":"R","character":"周棋洛","decision":0,"creativity":0,"appetency":0,"action":0,"way":"自定义","id":1519353885350},{"name":"星空之吻","rarity":"SR","character":"白起","decision":55,"creativity":2554,"appetency":1132,"action":2830,"way":"自定义","id":1519353993354},{"name":"你的模样","rarity":"R","character":"周棋洛","decision":39,"creativity":1314,"appetency":1597,"action":1211,"way":"自定义","id":1519354093529}],"pre-defined":["交缠视线","记忆裂痕"]}
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    self.show_msg('数据格式错误');
                    return false;
                }

                if (data.company) {
                    list.push({
                        name: '公司属性',
                        decisiveness: data.company.decisiveness,
                        creativity: data.company.creativity,
                        kindness: data.company.kindness,
                        activity: data.company.activity
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
                    var arr = data[i].split(/[ \t]/);
                    if (self.empty(arr) || arr.length < 5) {
                        continue;
                    }
                    if (arr[0] == '公司属性') {
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
                    self.batch.source = 'calculator';
                }
            });
        },
        //导入数据合并
        merge: function(data) {
            var ids = this.my_cards;
            var list = this.list;
            for (var i = 0; i < data.length; i++) {
                var card = data[i];
                if (ids.indexOf(card.card_id) < 0) {
                    list.push(card);
                } else {
                    list[ids.indexOf(card.card_id)] = card;
                }
            }
            list.sort(function(a, b) {
                return b.total - a.total;
            });
            var my_cards = [];
            for (var i = 0; i < list.length; i++) {
                my_cards.push(list[i].card_id);
            }

            this.list = list;
            this.my_cards = my_cards;
        },
        //批量导入
        show_batch: function(option) {
            if (option == 'import_data' && ['calculator', 'excel'].indexOf(this.batch.source) < 0) {
                this.batch.source = 'calculator';
            }
            this.batch.option = option;
            this.batch.export = '';
            $('#batch').modal();
        },
        //筛选
        update_list_filtered: function() {
            var list = this.list;
            var filter = this.card_filter;

            this.list_filtered = [];
            for (var i = 0; i < list.length; i++) {
                if (this.use_filter(filter, list[i])) {
                    this.list_filtered.push(list[i]);
                }
            }
        },
        update_all_cards_filtered: function() {
            var list = this.all_cards;
            var filter = this.all_card_filter;

            this.all_cards_filtered = [];
            for (var i = 0; i < list.length; i++) {
                if (this.use_filter(filter, list[i])) {
                    this.all_cards_filtered.push(list[i]);
                }
            }
        },
        use_filter: function(filter, item) {
            var ret = true;
            for (f in filter) {
                if ((filter[f] != '' && filter[f] != '0') && (typeof(item[f]) == 'string' ? item[f].indexOf(filter[f]) < 0 : item[f] != filter[f])) {
                    ret = false;
                    break;
                }
            }
            return ret;
        },
        //添加羁绊
        add_all_card: function() {
            var ack = confirm('确定添加全部吗？');
            if (!ack) {
                return false;
            }

            this.batch.source = 'all';
            this.import_data();
        },
        add_custom_card: function(card_id) {
            var card = this.cards[card_id];
            this.card_select.card_id = card.card_id;
            this.card_select.name = card.name;
            this.show_card();
        },
        add_my_card: function(card_id, option, is_new) {
            var self = this;
            var card = this.cards[card_id];
            var evolved = option == 'evolved' ? 1 : 0;
            var star = option == 'evolved' ? card.type + 1 : card.type;
            var level = card.type >= 3 ? (star - 1) * 10 : card.type * 5;

            if(is_new && card.type >= 3){
                star += 1;
                level += 10;
            }

            var user_correct = 0;
            var data = self.predict_card(card.card_id, evolved, star, level);
            var prop = self.prop;

            $.ajax({
                url: self.base_url + 'save_card',
                type: 'post',
                data: {
                    token: self.get_token(),
                    card_id: card.card_id,
                    evolved: evolved,
                    star: star,
                    level: level,
                    decisiveness: data.decisiveness,
                    creativity: data.creativity,
                    kindness: data.kindness,
                    activity: data.activity,
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
                    } else if (res.info) {
                        show_msg(res.info);
                    }
                },
                error: function(res) {
                    self.show_msg('请求失败');
                }
            });
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
        get_combine_score: function(card) {
            var prop = this.prop;
            var score = 0;

            for (var i = 0; i < prop.length; i++) {
                score += card[prop[i]] * this.levels.level[prop[i]];
            }

            return Math.round(score);
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

            if (this.empty(card.base) || this.empty(card.inc)) {
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
            } else {
                var base = card.base.split(',');
                var inc = card.inc.split(',');
                var prop = this.prop
                var data = {};
                for (var i = 0; i < prop.length; i++) {
                    data[prop[i]] = Math.floor((parseInt(base[i], 10) + Math.floor(level * parseInt(inc[i], 10) / 100 * (100 + 20 * (star - 1)) / 100)) * (100 + (evolved == 1 ? 45 : 0)) / 100);
                }
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
                    list: self.login.option == 'create_user' ? self.get_json_list() : '',
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
        get_json_list: function() {
            var list = this.list;
            if (this.empty(list)) {
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
            for (var i = 0; i < list.length; i++) {
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
            if (gain.indexOf('副本') >= 0) {
                return '副本';
            } else if (gain.indexOf('充值') >= 0) {
                return '充值';
            } else if (gain.indexOf('签到') >= 0) {
                return '签到';
            } else if (gain.indexOf('公测') >= 0) {
                return '公测';
            } else if (gain.indexOf('许愿') >= 0) {
                return '许愿';
            } else if (gain.indexOf('登录') >= 0) {
                return '登录';
            } else if (gain.indexOf('24小时') >= 0) {
                return '24小时';
            } else if (gain.indexOf('梦心湖') >= 0) {
                return '梦心湖';
            } else if (gain.indexOf('限定') >= 0) {
                return '限定';
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
                case 7:
                    ret = '李泽言生日';
                    break;
                case 8:
                    ret = '白起情人节';
                    break;
                case 9:
                    ret = '周棋洛生日';
                    break;
            }
            return ret;
        },
        //票房主题
        get_ticket_name: function(ticket_id) {
            var ret = '';
            for (var i = 0; i < this.ticket.length; i++) {
                if (this.ticket[i].id == ticket_id) {
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
                        self.all_cards = [];
                        for (id in self.cards) {
                            var card = self.cards[id];
                            self.card_list.push(card.name);
                            self.all_cards.push(card);
                        }
                        self.all_cards.sort(function(a, b) {
                            return (b.type * 100 + b.category) - (a.type * 100 + a.category);
                        });

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

                        if (res.challenge) {
                            self.challenge = res.challenge;
                        }

                        if (!self.empty(res.today) && self.empty(self.today)) {
                            self.today = res.today;
                            self.ticket_combine();
                        }

                        self.challenge_reset();

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

                            $('#challenge_typeahead').change(function() {
                                var name = $(this).val();

                                if (self.card_list.indexOf(name) >= 0) {
                                    for (id in self.cards) {
                                        if (self.cards[id].name == name) {
                                            self.challenges.select.card_id = id;
                                            self.challenges.select.category = self.cards[id].category;
                                            self.challenges.select.type = self.cards[id].type;
                                            self.challenges.select.name = self.cards[id].name;
                                            break;
                                        }
                                    }
                                    self.update_challenge_select();
                                }
                            });

                            $('#navbar-menu ul li a').click(function() {
                                $('#navbar-menu').collapse('hide');
                            });

                            self.dom_init = true;
                        }

                        if (self.empty(self.list)) {
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
        $('#tips').hide();
        this.list = $.LS.get('list') ? JSON.parse($.LS.get('list')) : [];
        this.my_cards = $.LS.get('my_cards') ? JSON.parse($.LS.get('my_cards')) : [];
        this.load();
    }
});