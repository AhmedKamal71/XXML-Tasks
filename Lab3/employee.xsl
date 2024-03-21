<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Employee Information</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Employee Information</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phones</th>
                        <th>Addresses</th>
                    </tr>
                    <xsl:for-each select="contacts/employee">
                        <tr>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="email"/></td>
                            <td>
                                <xsl:for-each select="phones/phone">
                                    <xsl:value-of select="."/><xsl:if test="position() != last()">, </xsl:if>
                                </xsl:for-each>
                            </td>
                            <td>
                                <xsl:for-each select="addresses/address">
                                    <xsl:value-of select="street"/>, <xsl:value-of select="building"/>, <xsl:value-of select="number"/>, <xsl:value-of select="region"/>, <xsl:value-of select="city"/>, <xsl:value-of select="country"/><br/>
                                </xsl:for-each>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
