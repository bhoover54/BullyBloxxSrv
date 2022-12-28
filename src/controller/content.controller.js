import HTTP from "../config/status-code.js"
import Content from "../model/content.model.js"

const createContent = async (req, res) => {
  try {
    const school = await Content.create(req.body)
    if (school.id)
      return res.status(HTTP.SUCCESS).json({
        message: "success",
        id: school.id
      })
    return res.status(HTTP.BAD_REQUEST).json({
      message: "fail"
    })
  } catch (error) {
    console.log(error)
  }
}

const updateContent = async (req, res) => {
  try {
    const school = await Content.update(req.body, { where: { id: req.params.id } })
    return res.status(HTTP.SUCCESS).json({
      message: "success"
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteContent = async (req, res) => {
  try {
    const school = await Content.destroy({ where: { id: req.params.id } })
    return res.status(HTTP.NO_CONTENT).json({
      message: "success"
    })
  } catch (error) {
    console.log(error)
  }
}

const getContent = async (req, res) => {
  try {
    const school = await Content.findOne({ where: { title: req.params.id } })
    return res.status(HTTP.SUCCESS).json({
      message: "success"
    })
  } catch (error) {
    console.log(error)
  }
}

const getContents = async (req, res) => {
  try {
    const school = await Content.findAll()
    return res.status(HTTP.SUCCESS).json({
      message: "success"
    })
  } catch (error) {
    console.log(error)
  }
}

const CONTENT = { createContent, updateContent, deleteContent, getContent, getContents }

export default CONTENT
