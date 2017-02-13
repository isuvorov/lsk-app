// subscribe
// publish
// socket.io
// redis ?? memory ??
//

const user = User
.findById('rutyUIJTDYGUHIJYTCYGUH')


user.subscribe()
user.save()

CHANGE !!!!



SWARM -> OP based

{
sadnkasbdabsdn
jhasdghjgas ++ 123123
asd
as
d
asd
ad
asd

asd
sda
hgghfghfhg
}



User
.findById('rutyUIJTDYGUHIJYTCYGUH')
.populate('task')
.where('age').gt(17).lt(66)
.select('name task age')


User
.find()
.populate('task')
.populate('pet')
.where('pet').ne(null)
.limit(100)
.skip(10)

User.find({
  pet: {
    $in: ['yrty5y5', 'y6y6y64y45yt', '6t5y456y34']
  }
})

User.remove({}) ?? Удалить всех юзеров ?? ACL ??

const user = await User.findById('5t5yht4h64')
user.age = 10
user.save()

user.getFriends = async function() {
  return User.find({
    friends: {
      $in: [this._id],
    }
  })
}
const user = await User.findById('5t5yht4h64')
user.age = 10
const friends = await user.getFriends()
const friendsOfFriends = await Promise.all(friends.map(friend => friend.getFriends()))
user.save()

const user = await User.findById('5t5yht4h64')
const pet = await user.getPet()
pet.age++
user.age++
pet.save()
user.save()

const user = await User.findById('5t5yht4h64')
const pet = await user.getPet()
pet.remove()



// config/router\
//
//
//
PROTO
transport
acl

=> + mongoose + 87687689 => model
=> controller


 => creteController(model, {acl: Model.acl})

 => createExpressRouter(controller)
 => createExpressRouter(models)
 GET /:id
 GET /

 /@@@universal





class Product {
  acl = new Acl(
    {
      // name: 'product',
      extend: ctx.config.acl,
      // extend: ctx.config.acl.product,
      roles: {
        admin: '*',
        user: ['read', 'create', 'acceptFriend'] // CRUD
      }
      checkers: { // ????
        own: (req, resourse, resourse2) => { // async
          return resourse.user_id === req.user.userId
        }
      }
    }

  }, {

  })
  static deleteAll(req) {
    this.acl.isAllow(req, 'deleteAll');

  }

  edit(req, params) {
    if (!this.acl.isAllow(req, 'own')) {

    }
    if (!this.acl.isAllow(req, 'create')) {

    }

    if (!this.acl.isAllow(req, 'own'))
    this.acl.isAllow(req, 'deleteAll');
  }

}


router.use('/products', Product.acl.can('list'), () => {

})
router.use('/products/:id', Product.acl.can('own'), () => {

})


class ProductController {
  acl() {

  }


  edit(req, res)  {
    const product = Product.findById(123123)
    Product.acl.isAllow(req, 'own', product, pet)

  }
}
