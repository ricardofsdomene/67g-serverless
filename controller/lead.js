const Lead = require("../models/Lead");

exports.create = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const user = new Lead({
      name,
      phone
    });

    await user.save();

    return res.status(201).send("Contato salvo com sucesso!")
  } catch (e) {
    return res.status(400).json({ status: "Erro!", error: e });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const users = await Lead.paginate({}, { page, limit: 10 });

    return res.send(users.docs);
  } catch (e) {
    return res.status(500).json({ stauts: "Erro!", error: e });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const _id = req.params._id;
    const user = await Lead.findOne({ _id });
    console.log(_id);
    res.json(user);
  } catch (e) {
    return res.status(500).json({ stauts: "Erro!", erorr: e });
  }
};

exports.update = async (request, response) => {
  try {
    // endpoint/key/value/_id

    const key = request.body.key;
    const value = request.body.value;
    const id = request.params._id;

    const update = { [key]: value, updatedAt: Date.now() };

    await Lead.findByIdAndUpdate(
      id,
      update,
      { useFindAndModify: true, new: true },
      function (err, docs) {
        if (err) {
          return response.json({ error: true, message: "falhou no mongoose" });
        } else {
          return response.json({
            Message: "Lead atualizado com sucesso",
            user: docs,
          });
        }
      }
    )
      .clone()
      .catch((error) => {
        return response.json({ error: true, message: "falhou no mongoose" });
      });
  } catch (e) {
    console.error(e);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params._id;

    await Lead.findByIdAndDelete(id).then(() => {
      return res.json({ message: "Lead deletado com sucesso!" });
    });
  } catch (e) {
    return res.status(400).json({ status: "Erro!", error: e });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Lead.deleteMany().then(() => {
      return res.json({
        message: "Todos os Leads foram deletados com sucesso!",
      });
    });
  } catch (e) {
    return res.status(400).json({ status: "Erro!", error: e });
  }
};
