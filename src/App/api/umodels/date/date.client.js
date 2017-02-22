import { doClientRequest, createClientAction, connectAction } from 'universal-model';

export default {
  i: 1,
  async date1() {
    const res = await doClientRequest({
      api,
      model: 'date',
      action: 'now',
      arguments: [1, 2],
    });
    return new Date(res);
  },

  dateFromServer: createClientAction({
    api,
    model: 'date',
    action: 'now'
  }),

  async date2() {
    try {
      return new Date(await this.dateFromServer());
    } catch (err) {
      return new Date();
    }
  },

  @connectAction({
    api,
    model: 'date',
    action: 'now',
  })
  date3(res, args) {
    return new Date(res);
  },

  date4 = createClientAction({
    api,
    model: 'date',
    action: 'now',
    onSuccess: Date,
    onError: (err) => (new Date()),
  })

  tomorrow() {
    const date = this.date4();
    return new Date(date.getTime() + (24 * 60 * 60 * 1000));
  },
};




// @connectModel(api = null, 'date', {
//   actions: ['now']
// })


@connectModel({
  api,
  model: 'date',
  actions: ['now', 'find', 'findOne']

  types: {
    now: {
      serialize: (date) => date.toString(),
      deserialize: (str) => new Date(str),
    },
    findOne: {
      serialize: (m) => m.toObject(),
      deserialize: (obj) => new Object(obj),
    },
    findById: {
      serialize: (m) => m.toObject(),
      deserialize: (obj) => new Object(obj),
    },
    find: {
      serialize: (arr) => arr.map(m.toObject()),
      deserialize: (arr) => arr.map(obj => new Object(obj)),
    },
    update: {
      serialize: (arr) => arr.map(m.toObject()),
      deserialize: (arr) => arr.map(obj => new Object(obj)),
    },
    findAll: {
      serialize: (arr) => arr.map(m.toObject()),
      deserialize: (arr) => arr.map(obj => new Object(obj)),
    },
  }
})
{
  tomorrow() {
    const date = this.now();
    return new Date(date.getTime() + (24 * 60 * 60 * 1000));
  },
}


const single = {
  serialize: (m) => m.toObject(),
  deserialize: (obj) => new Object(obj),
};
const multiple = {
  serialize: (arr) => arr.map(m.toObject()),
  deserialize: (arr) => arr.map(obj => new Object(obj)),
}

@connectModel({
  api,
  model: 'date',
  config: '_universal',
})
{
  _universal: {
    model: 'date',
    onError: () => {},

    actions: ['now', 'find', 'findOne', {
      name: 'findAll',
      serialize: (date) => { data instanceof Date ? date.toString() : throw '!check' } ,
      // serialize: (date) => { date.toString() } ,
      deserialize: (str) => new Date(str),

      // onError: () => {},
      // onError:
    }]

    actions: {
      tomorrow: 'any',
      tomorrow: 'single',
      tomorrow: true,
      tomorrow: true,
      now: {
        // check: (date) => data instanceof Date,
        serialize: (date) => { data instanceof Date ? date.toString() : throw '!check' } ,
        // serialize: (date) => { date.toString() } ,
        deserialize: (str) => new Date(str),
      },
      findOne:single,
      findById: single,
      find: multiple,
      update: multiple,
      findAll: multiple,
    },
    // types: {
    //   single: {
    //     serialize: (m) => m.toObject(),
    //     deserialize: (obj) => new Object(obj),
    //   }
    // }
  }


  tomorrow() {
    const date = this.now();
    return new Date(date.getTime() + (24 * 60 * 60 * 1000));
  },
}


{
  avaiableMethods = ['findAll', 'findAll2']
  async findAll(age) {
    return [
      {
        age: 1,
        name: 'One',
      },
      {
        age: 2,
        name: 'Two',
      },
      {
        age: 3,
        name: 'Three',
      },
    ].filter((pet) => {
      if (!age) return true;
      return pet.age >= age;
    });
  },
  async findAll2() {
    return [
      {
        age: 1,
        name: 'One',
      },
      {
        age: 2,
        name: 'Two',
      },
      {
        age: 3,
        name: 'Three',
      },
    ];
  },
  async findAll3() {
    return [
      {
        age: 1,
        name: 'One',
      },
      {
        age: 2,
        name: 'Two',
      },
      {
        age: 3,
        name: 'Three',
      },
    ];
  }
}




const single = {
  serialize: (m) => m.toObject(),
  deserialize: (obj) => new Pet(obj),
};
const multiple = {
  serialize: (arr) => arr.map(m.toObject()),
  deserialize: (arr) => arr.map(obj => new Pet(obj)),
}

@connectModel()
class UniversalModel() {
  static _universal = {
    // ....///
    instance:  {
      api,
      model: 'Pet',
      actions: {
        getAroundPets: single,
      }
      params: {
        instance: true,
      }
    }
  }
  constructor(data) {
    connectModel(this,)
  }
}



// @connectInstanceModel({
//   api,
//   model: 'Pet',
//   actions: {
//     getAroundPets: single,
//   }
// })
@connectModel({
  api,
  model: 'Pet',
  actions: {
    find: multiple,
    findOne: single,
  }
})
class Pet {
  constructor(data) {
    connectModel(this, {
      api,
      model: 'Pet',
      actions: {
        getAroundPets: single,
      }
      params: {
        instance: true,
      }
    })
    this._id = data._id;
    this.name = data.name;
    this.age = data.age;
    this.avatar = data.avatar;
    // Object.assign(this, data)
  }

  static async staticTest() {
    const pet = await this.findOne({ age: 2})

    pet.getAroundPets();

    pet.age = 3;
    pet.age = 3;
    pet.age = 3;
    pet.age = 3;
    pet.age = 3;
    pet.age = 3;

    pet.save();
  }

  getAroundPets() {
    return doClientRequest({
      api,
      model: 'Pet',
      params: {
        instance: true,
        instance: {
          _id: this._id,
        },
        _id: this._id,
      },
      action: {
        name: 'getAroundPets',
        ...single,
      },
    });
  }

  save(parasm) {
    return doClientRequest({
      api,
      model: 'Pet',
      params: {
        instance: true,
        instance: {
          _id: this._id,
        },
        _id: this._id,
      },
      action: {
        name: 'serverSave',
        ...single,
      },
      args: [this.toObject()]
    });
  }

  save() {



    doc.save()

    Collection.createOrUpdate({asdasdasd})
    __v
    return doClientRequest({
      api,
      model: 'Pet',
      params: {
        instance: true,
        _id: this._id,
      },
      action: {
        name: 'save',
        ...single,
      },
    });
  }

  toObject() {
    return {
      name: this.name,
      age: this.age,
      avatar: this.avatar,
    }
  }
}







@connectModel({
  api,
  model: 'date',
  config: '_universal',
})
{
  _universal: {
    model: 'date',
    onError: () => {},

    actions: ['now', 'find', 'findOne', 'subscribe',{
      name: 'findAll',
      serialize: (date) => { data instanceof Date ? date.toString() : throw '!check' } ,
      // serialize: (date) => { date.toString() } ,
      deserialize: (str) => new Date(str),

      // onError: () => {},
      // onError:
    },{
      name: 'subscribeGame',
      socket: true,
    }]

    actions: {
      tomorrow: 'any',
      tomorrow: 'single',
      tomorrow: true,
      tomorrow: true,
      now: {
        // check: (date) => data instanceof Date,
        serialize: (date) => { data instanceof Date ? date.toString() : throw '!check' } ,
        // serialize: (date) => { date.toString() } ,
        deserialize: (str) => new Date(str),
      },
      findOne:single,
      findById: single,
      find: multiple,
      update: multiple,
      findAll: multiple,
    },
    // types: {
    //   single: {
    //     serialize: (m) => m.toObject(),
    //     deserialize: (obj) => new Object(obj),
    //   }
    // }
  }


  tomorrow() {
    const date = this.now();
    return new Date(date.getTime() + (24 * 60 * 60 * 1000));
  },


  subscribe(data) {
    this.setState({data})
  }

  start() {


    // WS
    // /game
    //
    // POST game -> 32
    //
    // socket1 = connect('/game?id=32') // connection
    //
    // socket1 = connect('/game?id=56') // connection
    // emit

    // /socket
    //
    // emit, on || broadcast



    const notifications = doClientRequest({
      api,
      socket: true,
      model: 'Notification',
      action: 'subscribe',
    });


//
    if (isNeed()) {
      const chat = doClientRequest({
        api,
        socket: true,
        model: 'Chat',
        action: 'subscribe',
      });
    }


//
    const game = doClientRequest({
      api, // usocket
      socket: true,
      model: 'Game',
      action: 'subscribe',
      arguments: [32],
    });



    //
    const game = await this.createGame(params)
    const socket = game.subscribe()
    res.on('update', (changes) =>  game.setState({}))

    // socket = this.subscribeGame(game._id)



    // const socket = new SocketIO('/universal', { model: 'Game', action: 'socketinit', params: { id: 32 }})
    //
    //
    // const socket = new SocketIO('/game')
    // const socket.emit({ params: { id: 32 }})
    //
    res.on('update', this.subscribe)


  },


}

class Game {

  findne(){}


  socketInit(req, socket) {
    if(!req.user) throw '500'

    req.user.isAdmin
    socket.emit('')


    this.findOne(req.data.id)

    this.sendAdmin()
  }
}

class Game2 {

  findne(){}


  socketInit(req, socket) {
    if (true) {
      socket.on('action', eruhueghuthg)
    }
    socket.emit('action', { status: true })
    req.user.isAdmin
    socket.emit('')


    this.findOne(req.data.id)

    this.sendAdmin()
  }
  socketInit(req, socket) {
    if (true) {
      socket.on('action', eruhueghuthg)
    }
    socket.emit('action', { status: true })
    req.user.isAdmin
    socket.emit('')


    this.findOne(req.data.id)

    this.sendAdmin()
  }
}


Pet.subscribe(['tythrt', 'ry5y5y])
