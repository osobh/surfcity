const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcrypt')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

class User {
  static async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, email, password: hashedPassword }])
    if (error) {
      console.log('Error creating user:', error.message)
      return null
    }
    console.log('User created:', data)
    return data
  }

  static async findUserByUsername(username) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .limit(1)
    if (error) {
      console.log('Error finding user:', error.message)
      return null
    }
    return data[0]
  }
}

module.exports = User
