using System.Text;

namespace App.Utility.Extentions.String
{
    public static class StringExtentions
    {
        public static bool IsNullOrEmpty(this string @this) => string.IsNullOrEmpty(@this);

        public static byte[] ToBytes(this string @this) => Encoding.UTF8.GetBytes(@this);
    }

}
