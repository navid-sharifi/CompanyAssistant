using System.Text;
using System.Text.RegularExpressions;

namespace App.Utility.Extentions.String
{
    public static class StringExtentions
    {
        public static bool IsNullOrEmpty(this string? @this) => string.IsNullOrEmpty(@this);

        public static byte[] ToBytes(this string @this) => Encoding.UTF8.GetBytes(@this);

        public static bool IsEmail(this string @this)
        {
            string emailRegexPattern = @"^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$";
            return Regex.IsMatch(@this, emailRegexPattern);
        }
        public static bool IsGuid(this string? @this)
        {
            if (@this.IsNullOrEmpty())
                return false;

            try
            {
                Guid guid = Guid.Parse(@this);
                return true;
            }
            catch
            {
                return false;
            }
        }

    }

}
