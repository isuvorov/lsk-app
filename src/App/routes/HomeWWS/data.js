import _ from 'lodash'
import moment from 'moment'

const ticketTitles = [
  'Требуется продлить доменное имя',
  'СРОЧНО Прошу зарегистрировать домен для нового ВЦ',
  'нужна помощь в создании нового почтового ящика',
  'Необходимо зарегистрировать имя по адресу …',
  'Помогите зарегистрировать доменное имя',
  'Требуется обновление имени',
  'Обновить имя',
  'Зарегистрировать новый адрес',
  'нужна помощь в создании нового почтового ящика',
  'Добавить в почтовый клиент ящик dd@lexsystems.ru',
  'не могу восстановить пароль на почте xyz@lexsystems.ru',
  'проблема с настройкой почтового клиента',
  'нужно настроить почту на андроиде',
  'установить почту на телефон',
  'письма отправляются, но не доходят до адресатов',
  'не отправляется письмо',
  'не работает отправка писем с ящика wws',
  'не отправляются письма с ящика wws',
  'огромная задержка при доставке писем',
  'просьба настроить перевод архивов писем на новую почту',
  'не форвардятся письма',
  'нужно увеличить объем почты',
  'закончилось место в папке "Отправленные"',
  'не приходит письмо',
  'Пропала почта',
  'Сайт Индии - добавление новости про график работы РВЦ Дели 25 01 16',
  'Urgent САЙТ АВСТРИИ - ИЗМЕНЕНИЕ РЕЖИМА РАБОТЫ-НОВОСТЬ+КОНТЕНТ РАЗДЕЛА КОНТАКТЫ',
  'Urgent САЙТ АВСТРИИ-ИЗМЕНЕНИЕ ТЕКСТА НОВОСТИ',
  'Urgent сайт Норвегии (изменение размера с/с во всех типах виз, активация меню 3 уроня с доп. услугами)',
  'Сайт Эстонии - замена текста О сборах в разделе Общая информация (внесение правки про детей и инвалидов)',
  'Сайт Бельгии - замена формы заявления на вкладке "Частная виза" для Антверпена',
  'Сайт Канады (добавление ссылок во все типы виз на экспресс-доставку)',
  'Италия (замена заявления для подачи документов в Российском визовом центре в Генуе)',
  'сайт Канады (изменение контента во всех типах виз, вкладка Тарифы и сроки)',
  'Сайт Бельгии - Добавление контента для раздела по рос услугам +объявление в раздел Новости +открытие эл очереди',
  'Стандарт сайт Канады (изменение контента во всех типах виз, вкладка Тарифы и сроки)',
  'Сайт Бельгии - Добавление контента для раздела по рос услугам +объявление в раздел Новости +открытие',
  'КИТАЙ. Размещение объявления на сайт rvccn.com',
  'ГОНКОНГ. Размещение объявления на сайт http://hk-ils.com/.',
  'сайт Венгрии (размещение объявления о режиме работы)',
  'сайт Сша (добавление информации по требованию к страховкам во все типы виз)',
  'сайт США (размещение объявления о режиме работы)',
  'Сайт Чехии - добавление новости по изменениям в графике приема-выдачи по февр-марту',
  'Сайт Чехии - изменения в адресе и времени работы в разделе Контакты (выделить красным,Брно адрес)',
  'Изменение адреса ссылки на сайте США (Баннер Сиэтла)',
  'добавление фразы на шаг 6 СЭЗ на сайте Германии и Австрии',
  'САЙТ ФРГ-ДОБАВЛЕНИЕ ЭКСПРЕСС ВИЗЫ В РАЗДЕЛ ДОП.УСЛУГИИ ВНЕСЕНИЕ КОНТЕНТА',
  'сайт Болгарии (размещение объявления о режиме работы в праздники)',
  'САЙТ ГРЕЦИИ-ИЗМЕНЕНИЕ ТАРИФОВ КС В ВИЗАХ ОД, ОГ, ОЧ.',
  'Сайт Франции - замена фраз по ГК на вкладках по услугам для рос граждан',
  'Требуется завести новую рабочую область',
  'Требуется создать нового пользователя',
  'Требуется удалить пользователя',
  'помощь в обновлении прав доступа',
  'Восстановление пароля',
  'при проводке статьи расходов в программу файл расхода не загружается в программу выдает ощибки.',
  'Здравствуйте, когда делаю проводку и хочу прикрепить файл мне выдает "Whoops, looks like something went wrong."',
  'Добрый день, не могу внести расходы, выдает ошибкой. С уважением, Вероника',
  'Не подкачивается файл (вложение отсканированного счета, подтверждающего расход). появляется пустое окно',
  'В расходах прогамма не сохраняет прикрепленный файл',
  'Здраствуйте, при вводе операций за сегодняшний день испытывала трудности постоянно происходили прерывания',
  'Требуется завести новую рабочую область',
  'Перенести контакты на мобильный телефон',
  'Требуется завести новую рабочую область',
  'помощь в обновлении прав доступа',
  'Изменить настройки приложения на сайте',
  'Требуется поменять распределение услуг по рабочим областям',
  'помогите откорректировать часы',
  'проблема с электронной записью',
  'Установка Skype',
  'Замена 2х картриджей на принтере в каб. 412',
  'МФУ громко жужжит при сканировании из лотка',
  'проблемы с включением компьютера у стажера',
  'принтер печатает черную полосу через весь лист',
  'проблемы со сканером',
  'Проблема с сохранением файлов',
  'шум в трубке',
  'Неисправность в телефонной трубке',
  'проблема с сетевыми дисками',
  'Просьба включить интернет',
  'Опять шумит трубка',
  'не проходит звонок',
  'Требуется выполнить обновление',
  'Нужно восстановить данные из бэкапа',
  'Требуется помощь в загрузке данных по турагентствам',
  'Сделайте пожалуйста откат базы данных',
  'Требуется восстановить данные',
  'Потерялись данные, требуется откат',
  'Требуется восстановить данные',
  'Проводка зависла',
  'Зависла первичная документация',
  'Не удается прикрепить первичку',
  'Проблема с проводкой',
  'Не проходят расходы',
  'Требуется восстановить видел из архива',
  'Требуется помощь, нужна видозапись камеры наблюдения',
  'Восстановить видео из архива',
  'Видео',
  'Видеоархив',
  'Требуется настройка удаленного доступа к системе',
  'Настройка камеры',
  'Задача по установке и настройке видеонаблюдения',
  'Видеонаблдение, установить камеру',
  'Установка камеры',
  'Требуется подключить камеру в офисе',
  'не работает доступ в систему видеонаблюдения',
  'не подключается видеонаблюдение, Гонконг',
  'Требуется создать новую учетную запись',
  'СОЗДАНИЕ УЧЕТНОЙ ЗАПИСИ',
  'учетная запись сотрудника',
  'учетка новый сотрудник',
  'Требуется удалить учетную запись',
  'УДАЛЕНИЕ УЧЕТНОЙ ЗАПИСИ',
  'учетная запись видеонаблюдения',
  'учетка видеонаблюдение удаление',
  'УДАЛЕНИЕ УЧЕТНОЙ ЗАПИСИ',
  'Просьба настроить права доступ',
  'Настройка прав доступа',
  'Настройте пожалуйста доступ в системе',
  'НАСТРОИТЬ ПРАВА ДОСТУПА',
  'Просьба настроить права доступ',
  'Не пропускает по карте',
  'Не распознает карточку',
  'карта неисправна',
  'ПОМОГИТЕ С ДОСТУПОМ',
  'Не пропускает по карте',
]
const categories = [
  ['Domain name',	'Registration & renewal'],
  ['Domain name',	'Various troubleshooting'],
  ['Domain name',	'Other'],
  ['Hosting',	'Storage upgrade'],
  ['Hosting',	'Server upgrade'],
  ['Hosting',	'Storage cleanup'],
  ['Hosting',	'No access — contact service provider'],
  ['Hosting',	'Account blocked due to the script'],
  ['Hosting',	'Recovery from backup'],
  ['Hosting',	'Various troubleshooting'],
  ['Hosting',	'Other'],
  ['Email',	'New email account'],
  ['Email',	'Suspend and delete email account'],
  ['Email',	'Change/recover email password'],
  ['Email',	'Setup mail client software'],
  ['Email',	'Setup mobile device access'],
  ['Email',	'Resolve sending/receiving issues'],
  ['Email',	'Setup email forwarding/filtering'],
  ['Email',	'Transfer email archive to the new mailbox'],
  ['Email',	'Change email storage quota'],
  ['Email',	'Various troubleshooting'],
  ['Email',	'Other'],
  ['Website content management',	'Add content to the web page, standard'],
  ['Website content management',	'Add content to the web page, urgent'],
  ['Website content management',	'Remove content from the web page'],
  ['Website content management',	'Enable/disable web application module'],
  ['Website content management',	'Various troubleshooting'],
  ['Website content management',	'Other'],
  ['Website content management',	'Create new user'],
  ['Online Service Application software «Finreport»',	''],
  ['Online Service Application software «Finreport»',	'Delete user'],
  ['Online Service Application software «Finreport»',	'Update user permissions'],
  ['Online Service Application software «Finreport»',	'Change/recover password'],
  ['Online Service Application software «Finreport»',	'Setup new workplace'],
  ['Online Service Application software «Finreport»',	'Various troubleshooting'],
  ['Online Service Application software «Finreport»',	'Other'],
  ['Online Service  Applicationsoftware «Contacts»',	'Setup new workplace'],
  ['Online Service  Applicationsoftware «Contacts»',	'Various troubleshooting'],
  ['Online Service  Applicationsoftware «Contacts»',	'Other'],
  ['Online Service  Application software «Electronic record»',	'Setup new workplace'],
  ['Online Service  Application software «Electronic record»',	'Change permissions of the user'],
  ['Online Service  Application software «Electronic record»',	'Change settings of web application on company website'],
  ['Online Service  Application software «Electronic record»',	'Change services allocation for workplaces'],
  ['Online Service  Application software «Electronic record»',	'Change working hours for workplace'],
  ['Online Service  Application software «Electronic record»',	'Various troubleshooting'],
  ['Online Service  Application software «Electronic record»',	'Other'],
  ['Online Service  Application software «Electronic record»',	''],
  ['Onsite Workstation support',	'Install and setup new software'],
  ['Onsite Workstation support',	'Select, install and setup new hardware'],
  ['Onsite Workstation support',	'Peripheral devices maintenance'],
  ['Onsite Workstation support',	'Recover data from backup'],
  ['Onsite Workstation support',	'Perform antivirus measures'],
  ['Onsite Workstation support',	'Update operating system and other software updates'],
  ['Onsite Workstation support',	'Remote user support session'],
  ['Onsite Workstation support',	'Various troubleshooting'],
  ['Onsite Workstation support',	'Other'],
  ['Accounting server and software',	'Restore database from backup'],
  ['Accounting server and software',	'Various troubleshooting'],
  ['Accounting server and software',	'Other'],
  ['Eva server',	'Update EVA software to the new version'],
  ['Eva server',	'Restore EVA database from backup'],
  ['Eva server',	'Upload travel agencies data to the EVA'],
  ['Eva server',	'Various troubleshooting'],
  ['Eva server',	'Other'],
  ['CCTV',	'Restore video archive from backup'],
  ['CCTV',	'Setup remote online access'],
  ['CCTV',	'Connect and setup new camera'],
  ['CCTV',	'Various troubleshooting'],
  ['CCTV',	'Other'],
  ['Access Control System',	'Create new employee account'],
  ['Access Control System',	'Delete employee account'],
  ['Access Control System',	'Setup permissions for single employee or group'],
  ['Access Control System',	'Various troubleshooting'],
  ['Access Control System',	'Other'],
]
const monitoringCategories = [
  ['Domain name', 'Availability'],
  ['Domain name', 'Resolving'],
  ['Hosting', 'Availability'],
  ['Hosting', 'Download speed is exceeding the minimum'],
  ['Hosting', 'Free space is more than 5%'],
  ['Email', 'Availability'],
  ['Email', 'Test email sent and received successfully'],
  ['Email', 'Free space is more than 5%'],
  ['Backup', 'Hosting'],
  ['Backup', 'Email'],
  ['Backup', 'Page download time is less than 500ms'],
  ['Backup', 'Online Service Application software «Finreport»'],
  ['Backup', 'Online Service Application software «Contacts»'],
  ['Backup', 'Online Service Application software «Electronic record»'],
  ['Website', 'Availability'],
  ['Website', 'Page download time is less than 500ms'],
  ['Website', 'Database connectivity'],
  ['Website', 'Availability'],
  ['Website', 'Page download time is less than 500ms'],
  ['Website', 'Database connectivity'],
  ['Online Service Application software «Contacts»', 'Availability'],
  ['Online Service Application software «Contacts»', 'Page download time is less than 500ms'],
  ['Online Service Application software «Contacts»', 'Database connectivity'],
  ['Online Service Application software «Electronic record»', 'Availability'],
  ['Online Service Application software «Electronic record»', 'Page download time is less than 500ms'],
  ['Online Service Application software «Electronic record»', 'Database connectivity'],
  ['EVA Server', 'Availability'],
  ['EVA Server', 'Free space is more than 5%'],
  ['EVA Server', 'Database connectivity'],
  ['Accounting server', 'Availability'],
  ['Accounting server', 'Free space is more than 5%'],
  ['CCTV server', 'Availability'],
  ['CCTV server', 'Free space is more than 5%'],
  ['Access Control server', 'Availability'],
  ['Access Control server', 'Free space is more than 5%'],
  ['Backup server', 'Free space is more than 5%'],
  ['Backup server', 'Harddrive SMART status'],
  ['Backup server', 'Eva daily backup status'],
  ['Backup server', 'Accounting daily backup status'],
  ['Backup server', 'CCTV daily status'],
  ['Backup server', 'AC daily status'],
  ['Backup server', 'Eva weekly status'],
  ['Backup server', 'Accounting weekly status'],
  ['Backup server', 'CCTV weekly status'],
  ['Backup server', 'AC weekly status'],
]

export default class Data {

  generate(props = {}) {
    if (!props.ticketIdStart) {
      props.ticketIdStart = 364
    }

    if (!props.tickets) {
      props.tickets = 1000
    }

    if (!props.startedAt) {
      props.startedAt = new Date('2016-01-01')
    } else if (typeof props.startedAt === 'string') {
      props.startedAt = new Date(props.startedAt)
    }

    if (!props.finishedAt) {
      props.finishedAt = new Date('2016-12-31')
    } else if (typeof props.finishedAt === 'string') {
      props.finishedAt = new Date(props.finishedAt)
    }

    if (!props.isWeekendProb) {
      props.isWeekendProb = 0.1
    }
    if (!props.resolvedProb) {
      props.resolvedProb = 0.9
    }
    if (!props.urgentProb) {
      props.urgentProb = 0.2
    }
    if (!props.resolvedDays) {
      props.resolvedDays = 90
    }

    this.props = props

    this.data = {
      tickets: this.generateTikets(),
      tickets: this.generateTikets(),
    }

  }

  generateDate(startedAt, finishedAt) {
    const date = new Date(_.random(startedAt.getTime(), finishedAt.getTime()))

    const isWeekend = _.random(0, 1, 1) <= this.props.isWeekendProb

    const monday = moment(date).startOf('week').toDate()
    const satuday = moment(date).startOf('week ').add(6, 'days').toDate()
    const sunday = moment(date).endOf('week').toDate()

    if (isWeekend) {
      return new Date(_.random(monday.getTime(), satuday.getTime() - 1))
    }
    return new Date(_.random(satuday.getTime(), sunday.getTime()))
  }

  generateTikets() {
    let tickets = []
    for(let i = 1; i <= this.props.tickets; i++) {
      const date = this.generateDate(this.props.startedAt, this.props.finishedAt)
      const resolved = Math.random() < this.props.resolvedProb
      const resolvedAt = this.generateDate(date,  moment(this.props.finishedAt).add(this.props.resolvedDays, 'days').toDate())
      tickets.push({
        date,
        resolvedAt: resolved ? resolvedAt : null,
        categoryId: _.random(1, categories.length),
        title: _.sample(ticketTitles),
        status: Math.random() < this.props.urgentProb ? 'urgent' : 'normal',
        resolved: resolved,
      })
    }
    tickets = _.sortBy(tickets, 'date')
    tickets.forEach((ticket, i) => {
      ticket.id = this.props.ticketIdStart + i;
    })
    return tickets
  }

  getData(startedAt = new Date('2016-06-01'), finishedAt = new Date('2016-06-30')) {

    const resolvedTickets = this.data.tickets.filter(ticket => {
      if (!ticket.resolved) return false
      return startedAt <= ticket.resolvedAt && ticket.resolvedAt < finishedAt
    })

    const tickets = this.data.tickets.filter(ticket => {
      return startedAt <= ticket.date && ticket.date <= finishedAt
    })


    return {
      categories,
      monitoringCategories,
      tickets,
      support: {
        summary: {
          new: tickets.length,
          status: _.countBy(tickets, 'status'),
          resolved: resolvedTickets.length,
        },
      },
    };
  }
}
